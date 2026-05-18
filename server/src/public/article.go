package public

import (
	"project/page"
)

func (p *public) article() {
	p.commonPage(page.PArticle{})
}

func (p *public) curated() {
	p.commonPage(page.PCurated{})
}

func (p *public) trash() {
	p.commonPage(page.PCurated{})
}
