package public

import (
	"project/page"
	"project/util"
)

func (p *public) item() {

	id := util.FirstNum(p.path)

	it := p.pm.LoadItem(id)
	if it == nil {
		p.error404()
		return
	}

	if it.NoteYear > 0 {
		p.redirect(p.pm.LinkItemInNote(it.NoteYear, id))
		return
	}

	if !p.isSecure {
		p.redirect(p.pm.LinkItem(id))
		return
	}
	p.readPage(page.ItemFile(id))
}
