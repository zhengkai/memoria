package public

import (
	"project/page"
)

func (p *public) home() {
	p.readPage(page.HomeFile)
}
