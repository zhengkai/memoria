package public

import (
	"project/page"
	"project/zj"
)

func (p *public) home() {
	zj.J(`home`)

	p.readPage(page.HomeFile)
}
