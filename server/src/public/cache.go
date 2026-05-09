package public

import (
	"project/page"
	"project/zj"
)

func (p *public) cache(pc *page.Page) {

	zj.J(`raw cache`, pc.File, len(pc.Raw))

	p.header(`Content-Type`, pc.Mime)

	p.w.Write(pc.Raw)
}
