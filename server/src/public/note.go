package public

import (
	"project/page"
	"project/util"
)

func (p *public) note() {

	year := uint32(util.FirstNum(p.path))
	if p.pm == nil {
		p.litePage(page.PNote(year))
		return
	}

	if year == 0 {
		year = p.pm.MaxNoteYear
	} else if year < p.pm.MinNoteYear || year > p.pm.MaxNoteYear {
		p.error404()
		return
	}

	if !p.isSecure {
		p.redirect(p.pm.LinkNote(year))
		return
	}

	if year == p.pm.MaxNoteYear {
		p.expire = ExpireShort
	}
	p.readPage(page.FileNote(year))
}
