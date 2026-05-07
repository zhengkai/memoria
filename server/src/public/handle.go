package public

import (
	"net/http"
	"project/export"
	"project/page"
	"project/util"
	"project/zj"
	"strings"

	"github.com/zhengkai/life-go"
)

var Handle = &handle{}

type handle struct {
	page       *page.Page
	routeTable map[string]func(*public)
}

func (h *handle) ServeHTTP(w http.ResponseWriter, r *http.Request) {

	w.Header().Add(`Server`, `Soulogic`)

	var headerOnly bool
	if r.Method != http.MethodGet {
		if r.Method == http.MethodHead {
			headerOnly = true
		} else {
			w.WriteHeader(http.StatusMethodNotAllowed)
			return
		}
	}

	etag := r.Header.Get(`If-None-Match`)
	if !h.page.IsInitDone() {
		if etag != `` {
			w.WriteHeader(http.StatusNotModified)
			return
		}
		w.Header().Add(`Retry-After`, `30`)
		w.WriteHeader(http.StatusServiceUnavailable)
		return
	}

	p := &public{
		w:          w,
		r:          r,
		page:       h.page,
		etag:       strings.TrimPrefix(etag, `W/`),
		headerOnly: headerOnly,
		mime:       `text/html; charset=utf-8`,
		isSecure:   r.Header.Get(`X-Forwarded-Proto`) == `https`,
		routeTable: h.routeTable,
	}
	p.run()
}

func (h *handle) Run() {

	h.routeTable = h.genRoute()

	// 先快速启动，所有的文件有就先用着
	t := util.BenchStart()
	h.page = &page.Page{}
	h.page.Init(true)
	zj.J(`page fast`, t.ElapsedMS())

	var prevCheck string

	// 每 5 秒检查 export.TimeFile 文件是否变化，变化则重建
	// export.TimeFile 的同步对应 misc/rsync-data.sh ，全部数据同步完后才变化
	for !life.Stop {

		life.Sleep(5)

		ab, err := util.ReadStaticBin(export.TimeFile)
		if err != nil {
			continue
		}
		check := string(ab)
		if prevCheck == check {
			continue
		}

		// 尝试重新生成一遍所有文件（大部分情况下会发现文件一致，没有写操作）
		t = util.BenchStart()
		page := &page.Page{}
		page.Init(false)
		zj.J(`page normal`, t.ElapsedMS())
		h.page = page

		prevCheck = check
	}
}
