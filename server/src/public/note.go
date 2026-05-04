package public

import (
	"project/page"
	"project/zj"
)

func (p *public) note() {
	zj.J(`note`)

	p.readPage(page.NoteFile(2023))
}
