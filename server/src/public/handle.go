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
	pm         *page.Manager
	routeTable map[string]func(*public)
}

func (h *handle) preflightCheck(w http.ResponseWriter, r *http.Request) (headerOnly bool, etag string, ok bool) {

	w.Header().Add(`Server`, `Soulogic`)

	if r.Method != http.MethodGet {
		if r.Method == http.MethodHead {
			headerOnly = true
		} else {
			w.WriteHeader(http.StatusMethodNotAllowed)
			return
		}
	}

	etag = r.Header.Get(`If-None-Match`)
	if h.pm == nil && etag != `` {
		w.WriteHeader(http.StatusNotModified)
		return
	}
	ok = true
	return
}

func (h *handle) ServeHTTP(w http.ResponseWriter, r *http.Request) {

	headerOnly, etag, ok := h.preflightCheck(w, r)
	if !ok {
		return
	}

	p := &public{
		w:          w,
		r:          r,
		pm:         h.pm,
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

	var prevCheck string

	// 每 5 秒检查 export.TimeFile 文件是否变化，变化则重建
	// export.TimeFile 的同步对应 misc/rsync-data.sh ，全部数据同步完后才变化
	for !life.Stop {

		if prevCheck != `` {
			life.Sleep(5)
		}

		ab, err := util.ReadStaticBin(export.TimeFile)
		if err != nil {
			continue
		}
		check := string(ab)
		if prevCheck == check {
			continue
		}

		// 尝试重新生成一遍所有文件（大部分情况下会发现文件一致，没有写操作）
		t := util.BenchStart()
		page := &page.Manager{}
		page.Init()
		zj.J(`page normal`, t.ElapsedMS())
		h.pm = page

		prevCheck = check

	}
}
