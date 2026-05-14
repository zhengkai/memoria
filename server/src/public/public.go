// Package public 静态页面对外访问
package public

import (
	"net/http"
	"project/config"
	"project/ipset"
	"project/page"
	"project/util"
	"project/zj"
	"strings"
)

type public struct {
	util.HTTP
	gzip        bool
	json        bool
	pm          *page.Manager
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

	if ipset.Contains(p.IP) && !strings.HasSuffix(p.R.URL.Path, `.css`) {
		p.error451()
		return
	}

	p.path = strings.TrimPrefix(p.R.URL.Path, p.R.Pattern)

	if p.pm != nil {
		pc, ok := p.pm.PageCache[`/`+p.path]
		if ok {
			p.cache(pc)
			return
		}
	}

	if !config.Prod {
		zj.J(`failback route`, `/`+p.path)
	}
	p.route()
}

func (p *public) redirect(path string) {
	p.Header(`Location`, p.pm.FullLink(path))
	p.WriteHeader(http.StatusMovedPermanently)
}

func (p *public) Expire(e page.Expire) {
	p.Header(`Cache-Control`, string(e))
}
