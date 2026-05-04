package util

import (
	"bytes"
	"crypto/sha256"
	"fmt"
	"io"
	"os"
	"path/filepath"
	"project/config"
	"project/zj"
	"strings"

	"google.golang.org/protobuf/proto"
)

var ErrHashNotMatch = fmt.Errorf(`hash not match`)

func Static(file string) string {
	file = strings.TrimPrefix(file, config.StaticDir+`/`)
	return fmt.Sprintf(`%s/%s`, config.StaticDir, file)
}

func WriteStaticBin(file string, bin ...[]byte) error {
	file = Static(file)
	return writeBin(file, bin...)
}

func ReadStaticBin(file string) ([]byte, error) {
	return os.ReadFile(Static(file))
}

func ReadStaticHash(file string) (hash [sha256.Size]byte, err error) {
	f, err := os.OpenFile(Static(file), os.O_RDONLY, 0644)
	if err != nil {
		return
	}

	buf := make([]byte, sha256.Size)
	_, err = io.ReadFull(f, buf)
	f.Close()
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

	return writeBin(file, hash[:], data)
}

func ReadStaticData(file string, m proto.Message) error {

	file = Static(file)

	ab, err := os.ReadFile(file)
	if err != nil {
		return err
	}
	if len(ab) <= sha256.Size {
		err = fmt.Errorf(`invalid static file: %s`, file)
		return err
	}

	data := ab[sha256.Size:]
	hash := sha256.Sum256(data)

	if !bytes.Equal(hash[:], ab[:sha256.Size]) {
		return fmt.Errorf(`invalid static file, sha256 fail: %s`, file)
	}

	return proto.Unmarshal(data, m)
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
