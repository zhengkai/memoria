package public

import (
	"project/page"
	"strings"
)

func (p *public) article() {

	if strings.HasPrefix(p.path, `archive`) { // 历史兼容
		p.item()
		return
	}

	if !p.isSecure {
		p.redirect(p.pm.LinkArticle())
		return
	}
	p.readPage(page.ArticleIndexFile)
}
