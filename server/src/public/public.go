// Package public 静态页面对外访问
package public

import (
	"net/http"
	"strings"
)

type public struct {
	w    http.ResponseWriter
	r    *http.Request
	gzip bool
	json bool
}

func (p *public) run() {
	path := strings.TrimPrefix(p.r.URL.Path, p.r.Pattern)
	p.route(path)
}
