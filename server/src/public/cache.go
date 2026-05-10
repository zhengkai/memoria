package public

import (
	"net/http"
	"project/page"
	"project/zj"
	"strings"
)

func (p *public) cache(pc *page.Page) {

	if p.cacheETag(pc) {
		p.w.WriteHeader(http.StatusNotModified)
		return
	}

	p.header(`Expires`, pc.HeaderExpires)
	p.header(`Content-Type`, pc.Mime)

	accept := p.r.Header.Get(`Accept-Encoding`)
	if accept != `` {
		if p.compressFile(accept, pc.Brotli, `br`) || p.compressFile(accept, pc.Gzip, `gzip`) {
			return
		}
	}

	p.header(`Content-Length`, pc.FileSize)
	if pc.Raw == nil {
		zj.J(`raw gzip file`, pc.Path, pc.FileSize)
		p.sendFile(pc.Path)
	} else {
		zj.J(`raw gzip memory`, pc.Path, pc.FileSize)
		p.w.Write(pc.Raw)
	}
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
		p.header(`ETag`, etag)
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

	p.header(`Content-Encoding`, name)
	p.header(`Content-Length`, cd.Size)
	if cd.Data == nil {
		zj.J(`cache`, name, `file`, cd.Path, cd.Size)
		p.sendFile(cd.Path)
	} else {
		zj.J(`cache`, name, `memory`, cd.Path, cd.Size)
		p.w.Write(cd.Data)
	}

	return true
}
