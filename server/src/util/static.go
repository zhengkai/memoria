package util

import (
	"bytes"
	"crypto/sha256"
	"fmt"
	"os"
	"path/filepath"
	"project/config"
	"strings"

	"google.golang.org/protobuf/proto"
)

var ErrHashNotMatch = fmt.Errorf(`hash not match`)

func Static(file string) string {
	file = strings.TrimPrefix(file, config.StaticDir+`/`)
	return fmt.Sprintf(`%s/%s`, config.StaticDir, file)
}

func WriteStaticBin(file string, bin []byte) error {
	file = Static(file)
	os.MkdirAll(filepath.Dir(file), 0755)
	return os.WriteFile(file, bin, 0644)
}

func ReadStaticBin(file string) ([]byte, error) {
	return os.ReadFile(Static(file))
}

func WriteStaticData(file string, m proto.Message) error {

	data, err := proto.Marshal(m)
	if err != nil {
		return err
	}

	hash := sha256.Sum256(data)

	file = Static(file)

	// 尝试读，文件存在且 hash 一致则跳过
	rf, err := os.OpenFile(file, os.O_RDONLY, 0644)
	if err == nil {
		prevHash := make([]byte, sha256.Size)
		i, _ := rf.Read(prevHash)
		rf.Close()
		if i == sha256.Size && bytes.Equal(prevHash, hash[:]) {
			return nil
		}
	} else {
		os.MkdirAll(filepath.Dir(file), 0755)
	}

	tmpName, err := writeTmp(hash, data)
	if err != nil {
		os.Remove(tmpName)
		return err
	}
	return os.Rename(tmpName, file)
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

func writeTmp(hash [sha256.Size]byte, data []byte) (name string, err error) {

	f, err := os.CreateTemp(Static(`tmp`), `tmp-go-*`)
	if err != nil {
		return
	}
	defer f.Close()
	f.Chmod(0644)
	name = f.Name()

	if _, err = f.Write(hash[:]); err != nil {
		return
	}
	if _, err = f.Write(data); err != nil {
		return
	}
	return
}
