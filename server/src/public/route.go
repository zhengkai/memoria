package public

var routeTable = map[string]func(*public){
	"article": (*public).article,
	"blog":    (*public).item,
	"file":    (*public).file,
	"item":    (*public).item,
	"note":    (*public).note,
	"post":    (*public).item,
	"style":   (*public).style,
	"tweet":   (*public).note,
}

func (h *handle) genRoute() map[string]func(*public) {
	m := make(map[string]func(*public))
	for prefix, fn := range routeTable {
		m[prefix[:1]] = fn
	}
	return m
}

func (p *public) route() {

	if p.path == `` || p.path == `/` {
		p.home()
		return
	}

	if fn, ok := p.routeTable[p.path[:1]]; ok {
		fn(p)
		return
	}

	p.error404()
}
