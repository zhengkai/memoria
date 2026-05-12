package public

import (
	"net/http"
	"project/page"
	"project/zj"
	"strings"
)

func (p *public) cache(pc *page.Page) {

	if p.cacheETag(pc) {
		p.WriteHeader(http.StatusNotModified)
		return
	}

	p.Header(`Expires`, pc.HeaderExpires)
	p.Header(`Content-Type`, pc.Mime)

	accept := p.R.Header.Get(`Accept-Encoding`)
	if accept != `` {
		if p.compressFile(accept, pc.Brotli, `br`) || p.compressFile(accept, pc.Gzip, `gzip`) {
			return
		}
	}

	if pc.Code > 200 {
		p.WriteHeader(pc.Code)
	}

	p.sendPage(`raw`, pc)
}

// 处理是否发 etag，是否 304 直接结束
func (p *public) cacheETag(pc *page.Page) (hit bool) {

	etag := pc.ETag

	if pc.Forever {
		if p.etag != `` {
			return true
		}
		etag = `"forever"`
	}

	if etag != `` {
		if etag == p.etag {
			return true
		}
		p.Header(`ETag`, etag)
	}
	return false
}

func (p *public) compressFile(accept string, cd page.PageCompress, name string) bool {
	if !cd.Available {
		return false
	}
	if !strings.Contains(accept, name) {
		return false
	}

	p.Header(`Content-Encoding`, name)

	p.sendPage(name, &cd)
	return true
}

func (p *public) sendPage(name string, ip page.IContent) {

	pc := ip.GetContent()

	p.Header(`Content-Length`, pc.Size)

	t := `memory`
	if pc.Data == nil {
		t = `file`
		p.sendFile(pc.Path)
	} else {
		p.W.Write(pc.Data)
	}
	zj.F(`cache %s %s %s %s`, name, t, pc.Path, pc.Size)
}
