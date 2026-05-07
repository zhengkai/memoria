// Package public 静态页面对外访问
package public

import (
	"net/http"
	"project/page"
	"strings"
)

type public struct {
	w          http.ResponseWriter
	r          *http.Request
	gzip       bool
	json       bool
	page       *page.Page
	path       string
	etag       string
	headerOnly bool
	mime       string
	isSecure   bool
	finalFile  string
}

func (p *public) run() {
	p.path = strings.TrimPrefix(p.r.URL.Path, p.r.Pattern)

	p.route()
}

func (p *public) redirect(path string) {
	p.w.Header().Set(`Location`, p.page.FullLink(path))
	p.w.WriteHeader(http.StatusMovedPermanently)
}
