package util

import (
	"bytes"
	"compress/gzip"
	"fmt"
	"io"
	"os"
	"os/exec"
)

type FnCompress func(string) ([]byte, error)

func Gzip(data []byte) ([]byte, error) {
	var buf bytes.Buffer
	w := gzip.NewWriter(&buf)
	if _, err := w.Write(data); err != nil {
		return nil, err
	}
	if err := w.Close(); err != nil {
		return nil, err
	}
	return buf.Bytes(), nil
}

func GzipFile(file string) ([]byte, error) {
	f, err := os.Open(file)
	if err != nil {
		return nil, err
	}
	defer f.Close()

	var buf bytes.Buffer
	writer, err := gzip.NewWriterLevel(&buf, gzip.BestCompression)
	if err != nil {
		return nil, err
	}

	_, err = io.Copy(writer, f)
	if err != nil {
		return nil, err
	}

	err = writer.Close()
	if err != nil {
		return nil, err
	}

	return buf.Bytes(), nil
}

// Brotli 使用命令行而不是库，觉得发行版更稳
func Brotli(input []byte) ([]byte, error) {
	cmd := exec.Command(`brotli`, `--best`, `--stdout`)
	cmd.Stdin = bytes.NewReader(input)
	var out bytes.Buffer
	var stderr bytes.Buffer
	cmd.Stdout = &out
	cmd.Stderr = &stderr
	if err := cmd.Run(); err != nil {
		return nil, fmt.Errorf("brotli compress byte(%d): %v, stderr: %s", len(input), err, stderr.String())
	}
	return out.Bytes(), nil
}

func BrotliFile(file string) ([]byte, error) {
	cmd := exec.Command(`brotli`, `--best`, `--stdout`, file)
	var out bytes.Buffer
	var stderr bytes.Buffer
	cmd.Stdout = &out
	cmd.Stderr = &stderr
	if err := cmd.Run(); err != nil {
		return nil, fmt.Errorf("brotli compress file %s: %v, stderr: %s", file, err, stderr.String())
	}
	return out.Bytes(), nil
}
