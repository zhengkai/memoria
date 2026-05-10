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

	if pc.Gzip.Available || pc.Brotli.Available {
		accept := p.r.Header.Get(`Accept-Encoding`)
		if pc.Gzip.Size != `` && strings.Contains(accept, `gzip`) {
			p.header(`Content-Type`, pc.Mime)
			p.header(`Content-Encoding`, `gzip`)
			if pc.Gzip.Data == nil {
				zj.J(`cache gzip file`, pc.Gzip.Path, pc.Gzip.Size)
				p.sendFile(pc.Gzip.Path)
			} else {
				zj.J(`cache gzip memory`, pc.Gzip.Path, pc.Gzip.Size)
				p.header(`Content-Length`, pc.Gzip.Size)
				p.w.Write(pc.Gzip.Data)
			}
			return
		}
	}

	p.header(`Content-Type`, pc.Mime)
	if pc.Raw == nil {
		zj.J(`raw gzip file`, pc.Path, pc.FileSize)
		p.sendFile(pc.Path)
	} else {
		zj.J(`raw gzip memory`, pc.Path, pc.FileSize)
		p.header(`Content-Length`, pc.FileSize)
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
