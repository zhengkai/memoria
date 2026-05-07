package util

import (
	"crypto/sha256"
	"fmt"
	"os"
	"path/filepath"
	"project/config"
	"project/zj"
	"strings"

	"golang.org/x/sys/unix"
	"google.golang.org/protobuf/proto"
)

const xattrHashKey = `user.sha256hash`

var ErrHashNotMatch = fmt.Errorf(`hash not match`)

func Static(file string) string {
	file = strings.TrimPrefix(file, config.StaticDir+`/`)
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
