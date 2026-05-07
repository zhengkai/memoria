package public

import "project/export"

func (p *public) style() {
	p.mime = `text/css; charset=utf-8`
	p.readPage(export.StyleFile)
}
