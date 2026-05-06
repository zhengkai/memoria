package public

import (
	"project/page"
)

func (p *public) article() {
	p.readPage(page.ArticleIndexFile)
}
