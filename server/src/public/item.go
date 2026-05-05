package public

import (
	"project/page"
	"project/util"
)

func (p *public) item(path string) {

	id := util.FirstNum(path)

	p.readPage(page.ArticleSingleFile(id))
}
