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

func Static(file string) string {
	file = strings.TrimPrefix(file, config.StaticDir+`/`)
	return fmt.Sprintf(`%s/%s`, config.StaticDir, file)
}

func WriteStaticData(file string, m proto.Message) error {

	data, err := proto.Marshal(m)
	if err != nil {
		return err
	}

	hash := sha256.Sum256(data)

	file = Static(file)

	prev, _ := os.ReadFile(file)
	if len(prev) > sha256.Size {
		prevHash := prev[len(prev)-sha256.Size:]
		if bytes.Equal(prevHash, hash[:]) {
			return nil
		}
	} else {
		os.MkdirAll(filepath.Dir(file), 0755)
	}

	f, err := os.OpenFile(file, os.O_WRONLY|os.O_CREATE|os.O_TRUNC, 0644)
	if err != nil {
		return err
	}

	if _, err = f.Write(data); err != nil {
		return err
	}

	if _, err = f.Write(hash[:]); err != nil {
		return err
	}

	return nil
}

func ReadStaticData(file string, m proto.Message) (hash [sha256.Size]byte, err error) {
	file = Static(file)

	ab, err := os.ReadFile(file)
	if err != nil {
		return
	}
	if len(ab) <= sha256.Size {
		err = fmt.Errorf(`invalid static file: %s`, file)
		return
	}

	copy(hash[:], ab[len(ab)-sha256.Size:])
	data := ab[:len(ab)-sha256.Size]
	if sha256.Sum256(data) != hash {
		err = fmt.Errorf(`invalid static file, sha256 fail: %s`, file)
		return
	}

	err = proto.Unmarshal(data, m)
	if err != nil {
		return
	}

	return
}
