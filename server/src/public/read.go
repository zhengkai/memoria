package public

import (
	"crypto/sha256"
	"errors"
	"project/util"
	"project/zj"
)

func (p *public) readPage(file string) error {

	c, err := util.ReadStaticBin(file)
	size := len(c) - sha256.Size
	if size < 10 {
		err = errors.New("file content too short")
	}
	if err != nil {
		zj.W(err)
		return err
	}

	p.w.Write(c[sha256.Size:])
	return nil
}
