package public

import (
	"project/tarpit"
)

const routeMatchLen = 4

var routeTable = map[string]func(*public){
	"article": (*public).article,
	"archive": (*public).item,
	"blog":    (*public).item,
	"file":    (*public).file,
	"upload":  (*public).file,
	"item":    (*public).item,
	"view":    (*public).item,
	"note":    (*public).note,
	"post":    (*public).item,
	"style":   (*public).style,
	"tweet":   (*public).note,
}

func (h *handle) genRoute() map[string]func(*public) {
	m := make(map[string]func(*public))
	for prefix, fn := range routeTable {
		m[prefix[:routeMatchLen]] = fn
	}
	return m
}

func (p *public) route() {

	if p.path == `` || p.path == `/` {
		p.home()
		return
	}

	if len(p.path) > routeMatchLen {
		if fn, ok := p.routeTable[p.path[:routeMatchLen]]; ok {
			fn(p)
			return
		}
	}

	if tarpit.Check(&p.HTTP) {
		return
	}

	p.error404()
}
