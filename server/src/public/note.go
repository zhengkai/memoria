package public

import (
	"project/page"
	"project/util"
)

func (p *public) note() {

	id := uint32(util.FirstNum(p.path))
	if id == 0 {
		id = 2023
	}

	p.readPage(page.NoteFile(id))
}
