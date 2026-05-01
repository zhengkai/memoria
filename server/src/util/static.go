package util

import (
	"bytes"
	"fmt"
	"os"
	"path/filepath"
	"project/config"
	"project/zj"
	"strings"
)

func Static(file string) string {
	file = strings.TrimPrefix(file, config.StaticDir+`/`)
	return fmt.Sprintf(`%s/%s`, config.StaticDir, file)
}

func WriteStaticFileIfModified(file string, data []byte) error {

	file = Static(file)
	zj.J(file)

	prev, _ := os.ReadFile(file)
	if bytes.Equal(prev, data) {
		return nil
	}

	if prev == nil {
		os.MkdirAll(filepath.Dir(file), 0755)
	}

	return os.WriteFile(file, data, 0644)
}
