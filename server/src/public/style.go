package public

import (
	"crypto/sha256"
	"project/util"
)

func (p *public) style() {
	c, _ := util.ReadStaticBin(`style.css`)
	p.w.Header().Set(`Content-Type`, `text/css; charset=utf-8`)
	p.w.Write(c[sha256.Size:])
}
