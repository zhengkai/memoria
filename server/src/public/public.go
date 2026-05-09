// Package public 静态页面对外访问
package public

import (
	"io"
	"net/http"
	"os"
	"project/config"
	"project/page"
	"project/util"
	"project/zj"
	"strings"
)

type public struct {
	w           http.ResponseWriter
	r           *http.Request
	gzip        bool
	json        bool
	pm          *page.Manager
	path        string
	etag        string
	headerOnly  bool
	mime        string
	expire      string
	isSecure    bool
	finalFile   string
	routeTable  map[string]func(*public)
	disableETag bool
}

func (p *public) run() {
	p.path = strings.TrimPrefix(p.r.URL.Path, p.r.Pattern)

	p.route()
}

func (p *public) redirect(path string) {
	p.w.Header().Set(`Location`, p.pm.FullLink(path))
	p.w.WriteHeader(http.StatusMovedPermanently)
}

func (p *public) sendFile(file string) {

	if config.UseNginx {
		p.w.Header().Set(`X-Accel-Redirect`, `/inter-`+file)
		return
	}

	fh, err := os.Open(util.Static(file))
	if err != nil {
		zj.W(`open file fail:`, file, err)
		return
	}
	defer fh.Close()
	io.Copy(p.w, fh)
}

func (p *public) header(k, v string) {
	p.w.Header().Set(k, v)
}
