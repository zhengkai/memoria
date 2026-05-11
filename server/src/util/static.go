package util

import (
	"bufio"
	"crypto/sha256"
	"fmt"
	"io"
	"iter"
	"os"
	"path/filepath"
	"project/config"
	"project/zj"
	"strings"
	"time"

	"golang.org/x/sys/unix"
	"google.golang.org/protobuf/proto"
)

const xattrHashKey = `user.sha256hash`

var StaticDirTail = config.StaticDir + `/`

type StaticFile struct {
	Path string
	Hash *[sha256.Size]byte
	File string
}

func (s *StaticFile) String() string {
	return s.Path
}

func NewStaticFile(path string) StaticFile {
	return StaticFile{
		Path: path,
		File: fmt.Sprintf(`%s/%s`, config.StaticDir, path),
	}
}

func (s *StaticFile) Ext(ext string) *StaticFile {
	return &StaticFile{
		Path: s.Path + ext,
		File: s.File + ext,
	}
}

func (s *StaticFile) GetHash() (*[sha256.Size]byte, error) {
	if s.Hash != nil {
		return s.Hash, nil
	}

	buf := make([]byte, sha256.Size)
	size, err := unix.Getxattr(s.File, xattrHashKey, buf)
	if size != sha256.Size {
		err = fmt.Errorf(`invalid hash size: %d`, size)
	}
	if err != nil {
		return nil, err
	}
	hash := [sha256.Size]byte{}
	copy(hash[:], buf)
	s.Hash = &hash
	return s.Hash, nil
}

func (s *StaticFile) WriteBin(hash [sha256.Size]byte, bin ...[]byte) error {
	err := writeBinHashForce(s.File, hash, bin...)
	if err == nil {
		s.Hash = &hash
	}
	return err
}

func (s *StaticFile) Size() (int64, error) {
	fi, err := os.Stat(s.File)
	if err != nil {
		return 0, err
	}
	return fi.Size(), nil
}

func (s *StaticFile) Stat() (os.FileInfo, error) {
	return os.Stat(s.File)
}

func (s *StaticFile) ReadBin() ([]byte, error) {
	return os.ReadFile(s.File)
}

func (s *StaticFile) Monitor(interval time.Duration, fn func(time.Time)) {

	first := true

	var prevTime time.Time

	for {

		if first {
			first = false
		} else {
			time.Sleep(interval)
		}

		info, err := s.Stat()
		if err != nil {
			continue
		}
		modTime := info.ModTime()
		if prevTime.Equal(modTime) {
			continue
		}
		prevTime = modTime

		fn(modTime)
	}
}

func (s *StaticFile) ReadLine() iter.Seq2[string, error] {
	return func(yield func(string, error) bool) {
		file, err := os.Open(s.File)
		if err != nil {
			yield(``, err)
			return
		}
		defer file.Close()

		scanner := bufio.NewScanner(file)
		for scanner.Scan() {
			if !yield(scanner.Text(), nil) {
				return
			}
		}
		if err := scanner.Err(); err != nil {
			yield(``, err)
		}
	}
}

func (s *StaticFile) ReadBinLimit(limit int) ([]byte, error) {

	buf := make([]byte, limit)
	f, err := os.Open(s.File)
	if err != nil {
		return nil, err
	}
	defer f.Close()

	n, err := io.ReadFull(f, buf)
	return buf[:n], err
}

var ErrHashNotMatch = fmt.Errorf(`hash not match`)

func Static(file string) string {
	file = strings.TrimPrefix(file, StaticDirTail)
	return fmt.Sprintf(`%s/%s`, config.StaticDir, file)
}

func StaticExists(path string) bool {
	_, err := os.Stat(Static(path))
	if err == nil {
		return true
	}
	return !os.IsNotExist(err)
}

func StaticMkdir(file string) error {
	return os.MkdirAll(filepath.Dir(Static(file)), 0755)
}

func WriteStaticBin(file string, bin ...[]byte) error {
	StaticMkdir(file)
	file = Static(file)
	return writeBin(file, bin...)
}

// WriteStaticBinHashForce 不经 hash 检查直接写，用于已经提前检查过 hash 的场景
func WriteStaticBinHashForce(file string, hash [sha256.Size]byte, bin ...[]byte) error {
	StaticMkdir(file)
	file = Static(file)
	return writeBinHashForce(file, hash, bin...)
}

// WriteStaticBinHash 比对 hash，不匹配才写入
func WriteStaticBinHash(file string, hash [sha256.Size]byte, bin ...[]byte) error {
	StaticMkdir(file)
	file = Static(file)
	return writeBinHash(file, hash, bin...)
}

func ReadStaticBin(file string) ([]byte, error) {
	return os.ReadFile(Static(file))
}

func ReadStaticHash(file string) (hash [sha256.Size]byte, err error) {

	buf := make([]byte, sha256.Size)
	size, err := unix.Getxattr(Static(file), xattrHashKey, buf)
	if size != sha256.Size {
		err = fmt.Errorf(`invalid hash size: %d`, size)
	}
	if err != nil {
		return
	}
	copy(hash[:], buf)
	return
}

func WriteStaticData(file string, m proto.Message) error {

	data, err := proto.Marshal(m)
	if err != nil {
		return err
	}

	hash := sha256.Sum256(data)

	return writeBinHash(file, hash, data)
}

func ReadStaticData(file string, m proto.Message) error {

	file = Static(file)

	ab, err := os.ReadFile(file)
	if err != nil {
		return err
	}
	return proto.Unmarshal(ab, m)
}

func writeBin(file string, li ...[]byte) (err error) {

	f, err := os.CreateTemp(Static(`tmp`), `tmp-go-*`)
	if err != nil {
		return
	}

	f.Chmod(0644)
	tmpName := f.Name()

	for _, ab := range li {
		if _, err = f.Write(ab); err != nil {
			zj.W(`write bin fail`, file, len(ab))
			os.Remove(tmpName)
			f.Close()
			return
		}
	}
	f.Close()

	return os.Rename(tmpName, file)
}

func writeBinHash(file string, hash [sha256.Size]byte, li ...[]byte) (err error) {

	// 尝试读，文件存在且 hash 一致则跳过
	prevHash, err := ReadStaticHash(file)
	file = Static(file)
	if err == nil {
		if prevHash == hash {
			return nil
		}
	} else {
		os.MkdirAll(filepath.Dir(file), 0755)
	}

	return writeBinHashForce(file, hash, li...)
}

func writeBinHashForce(file string, hash [sha256.Size]byte, li ...[]byte) (err error) {

	// 写临时文件，全部成功才会 rename
	f, err := os.CreateTemp(Static(`tmp`), `tmp-go-*`)
	if err != nil {
		return
	}

	f.Chmod(0644)
	tmpName := f.Name()

	for _, ab := range li {
		if _, err = f.Write(ab); err != nil {
			zj.W(`write tmpfile fail`, tmpName, len(ab), err)
			f.Close()
			os.Remove(tmpName)
			return
		}
	}

	fd := int(f.Fd())
	err = unix.Fsetxattr(fd, xattrHashKey, hash[:], 0)
	if err != nil {
		zj.W(`write tmpfile xattr fail`, tmpName, err)
		f.Close()
		os.Remove(tmpName)
		return
	}

	f.Close()

	return os.Rename(tmpName, file)
}
