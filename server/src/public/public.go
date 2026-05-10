// Package public 静态页面对外访问
package public

import (
	"net/http"
	"project/ipset"
	"project/page"
	"strings"
)

type public struct {
	w           http.ResponseWriter
	r           *http.Request
	gzip        bool
	json        bool
	pm          *page.Manager
	ip          string
	path        string
	etag        string
	headerOnly  bool
	mime        string
	isSecure    bool
	finalFile   string
	routeTable  map[string]func(*public)
	disableETag bool
}

func (p *public) run() {

	if ipset.Contains(p.ip) && !strings.HasSuffix(p.r.URL.Path, `.css`) {
		p.error451()
		return
	}

	p.path = strings.TrimPrefix(p.r.URL.Path, p.r.Pattern)

	if p.pm != nil {
		pc, ok := p.pm.PageCache[`/`+p.path]
		if ok {
			p.cache(pc)
			return
		}
	}

	p.route()
}

func (p *public) redirect(path string) {
	p.w.Header().Set(`Location`, p.pm.FullLink(path))
	p.w.WriteHeader(http.StatusMovedPermanently)
}

func (p *public) header(k, v string) {
	p.w.Header().Set(k, v)
}
