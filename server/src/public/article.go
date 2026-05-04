package public

import (
	"project/page"
	"project/zj"
)

func (p *public) article() {
	zj.J(`article`)

	p.readPage(page.ArticleIndexFile)
}
