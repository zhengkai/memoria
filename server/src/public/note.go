package public

import (
	"project/page"
	"project/util"
)

func (p *public) note() {

	year := uint32(util.FirstNum(p.path))
	if year == 0 {
		year = p.page.MaxNoteYear
	} else if year < p.page.MinNoteYear || year > p.page.MaxNoteYear {
		p.error404()
		return
	}

	if !p.isSecure {
		p.redirect(p.page.LinkNote(year))
		return
	}

	if year == p.page.MaxNoteYear {
		p.expire = ExpireShort
	}
	p.readPage(page.NoteFile(year))
}
