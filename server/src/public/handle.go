package public

import (
	"net/http"
	"project/page"
	"project/util"
	"project/zj"

	"github.com/zhengkai/life-go"
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

	// 先快速启动，所有的文件有就先用着
	t := util.BenchStart()
	h.page = &page.Page{}
	h.page.Init(true)
	zj.J(`page fast`, t.ElapsedMS())

	life.Sleep(10)

	// 尝试重新生成一遍所有文件（大部分情况下会发现文件一致，没有写操作）
	t = util.BenchStart()
	page := &page.Page{}
	page.Init(false)
	zj.J(`page normal`, t.ElapsedMS())
	h.page = page
}
