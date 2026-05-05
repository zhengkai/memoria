package public

import (
	"fmt"
	"project/page"
	"project/util"
)

func (p *public) item() {

	id := util.FirstNum(p.path)

	it := p.page.LoadItem(id)
	if it == nil {
		p.error404()
		return
	}

	if it.NoteYear > 0 {
		path := fmt.Sprintf(`/public/note/%04d.html#n%d`, it.NoteYear, id)
		p.redirect(path)
		return
	}

	p.readPage(page.ArticleSingleFile(id))
}
