package public

import (
	"io"
	"os"
	"project/util"
	"project/zj"
)

func (p *public) sendFile(file string) {

	fh, err := os.Open(util.Static(file))
	if err != nil {
		zj.W(`open file fail:`, file, err)
		return
	}
	defer fh.Close()
	io.Copy(p.W, fh)
}
