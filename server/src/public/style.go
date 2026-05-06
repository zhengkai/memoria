package public

func (p *public) style() {
	p.mime = `text/css; charset=utf-8`
	p.readPage(`style.css`)
}
