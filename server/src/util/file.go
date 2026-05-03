package util

import (
	"os"
	"project/config"
	"project/zj"
	"syscall"
)

func InitDirCheck() {
	if !DirCanRead(config.Dir) {
		zj.WF(`dir %s can not read`, config.Dir)
	} else if !canWrite() {
		zj.WF(`dir %s can not write`, config.Dir)
	}
}

func DirCanRead(dir string) bool {
	f, err := os.Open(dir)
	if err != nil {
		return false
	}
	defer f.Close()

	_, err = f.Readdirnames(1)
	return err == nil || err.Error() == "EOF"
}

func canWrite() bool {
	info, err := os.Stat(config.Dir)
	if err != nil {
		return false
	}

	mode := info.Mode().Perm()

	// 当前用户信息
	uid := os.Geteuid()
	gid := os.Getegid()

	stat, ok := info.Sys().(*syscall.Stat_t)
	if !ok {
		return false
	}

	switch {
	case uid == int(stat.Uid):
		return mode&0200 != 0 // owner write
	case gid == int(stat.Gid):
		return mode&0020 != 0 // group write
	default:
		return mode&0002 != 0 // others write
	}
}

func WriteTemp[T []byte | string](content T) (file string, err error) {

	f, err := os.CreateTemp(Static(`tmp`), `tmp-go-*`)
	if err != nil {
		return
	}

	switch v := any(content).(type) {
	case string:
		_, err = f.WriteString(v)
	case []byte:
		_, err = f.Write(v)
	}
	f.Close()
	file = f.Name()
	if err != nil {
		os.Remove(file)
	}
	return
}
