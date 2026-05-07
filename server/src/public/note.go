package public

import (
	"project/page"
	"project/util"
)

func (p *public) note() {

	id := uint32(util.FirstNum(p.path))
	if id == 0 {
		id = p.page.MaxNoteYear
	} else if id < p.page.MinNoteYear || id > p.page.MaxNoteYear {
		p.error404()
		return
	}

	if !p.isSecure {
		p.redirect(p.page.LinkNote(id))
		return
	}

	p.readPage(page.NoteFile(id))
}
