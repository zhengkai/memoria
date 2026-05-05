package public

import (
	"project/page"
	"project/util"
)

func (p *public) note(path string) {

	id := uint32(util.FirstNum(path))
	if id == 0 {
		id = 2023
	}

	p.readPage(page.NoteFile(id))
}
