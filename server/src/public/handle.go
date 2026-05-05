package public

import (
	"net/http"
	"project/page"
	"project/util"
	"project/zj"
)

var Handle = &handle{}

type handle struct {
	page *page.Page
}

func (h *handle) ServeHTTP(w http.ResponseWriter, r *http.Request) {

	if !h.page.IsInitDone() {
		w.Header().Add(`Retry-After`, `30`)
		w.WriteHeader(http.StatusServiceUnavailable)
		return
	}

	p := &public{
		w:    w,
		r:    r,
		page: h.page,
	}
	p.run()
}

func (h *handle) Run() {

	t := util.BenchStart()
	h.page = &page.Page{}
	h.page.Init()
	zj.J(t.ElapsedMS())

	// TODO
	// reload page
}
