package util

import (
	"bytes"
	"io"
	"os/exec"
	"project/zj"
)

func CmdExec(reader io.Reader, name string, arg ...string) ([]byte, error) {

	cmd := exec.Command(name, arg...)

	cmd.Stdin = reader

	var out bytes.Buffer
	cmd.Stdout = &out

	var errBuf bytes.Buffer
	cmd.Stderr = &errBuf

	if err := cmd.Run(); err != nil {
		return nil, err
	}

	if errBuf.Len() > 0 {
		zj.W(name, `error:`, errBuf.String())
	}

	return out.Bytes(), nil
}
