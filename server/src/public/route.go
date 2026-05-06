package public

import (
	"strings"
)

func (p *public) route() {

	if p.path == "" || p.path == "/" {
		p.home()
		return
	}

	li := map[string]func(){
		`style`:   p.style,
		`item`:    p.item,
		`article`: p.article,
		`note`:    p.note,
		`tweet`:   p.note,
		`file`:    p.file,

		// 历史兼容
		`archive`: p.item,
		`blog`:    p.item,
		`post`:    p.item,
	}
	for prefix, fn := range li {
		if strings.HasPrefix(p.path, prefix) {
			fn()
			return
		}
	}

	p.error404()
}
