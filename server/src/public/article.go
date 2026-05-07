package public

import (
	"project/page"
)

func (p *public) article() {
	if !p.isSecure {
		p.redirect(p.page.LinkArticle())
		return
	}
	p.readPage(page.ArticleIndexFile)
}
