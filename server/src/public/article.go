package public

import (
	"project/page"
)

func (p *public) article() {

	if p.pm == nil {
		p.litePage(page.PArticle{})
		return
	}

	if !p.isSecure {
		p.redirect(page.LinkArticle)
		return
	}
	p.readPage(page.FileArticle)
}
