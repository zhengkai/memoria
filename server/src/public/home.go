package public

import (
	"project/page"
)

func (p *public) home() {

	if p.pm == nil {
		p.litePage(page.PHome{})
		return
	}

	p.readPage(page.FileHome)
}
