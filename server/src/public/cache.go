package public

import (
	"fmt"
	"project/page"
	"project/zj"
	"strings"
)

func (p *public) cache(pc *page.Page) {

	var etag string

	if pc.Forever {
		if p.etag != `` {
			p.w.WriteHeader(304)
			return
		}
		etag = `"forever"`
	} else {
		etag = fmt.Sprintf(`"%x"`, pc.Hash[:7])
		if etag == p.etag {
			p.w.WriteHeader(304)
			return
		}
	}

	p.header(`ETag`, etag)

	if pc.Gzip.Available || pc.Brotli.Available {
		accept := p.r.Header.Get(`Accept-Encoding`)
		if pc.Gzip.Size != `` && strings.Contains(accept, `gzip`) {
			p.header(`Content-Type`, pc.Mime)
			p.header(`Content-Length`, pc.Gzip.Size)
			p.header(`Content-Encoding`, `gzip`)
			if pc.Gzip.Data == nil {
				zj.J(`cache gzip file`, pc.Gzip.Path)
				p.sendFile(pc.Gzip.Path)
			} else {
				zj.J(`cache gzip memory`, pc.Gzip.Path)
				p.w.Write(pc.Gzip.Data)
			}
			return
		}
	}

	p.header(`Content-Type`, pc.Mime)
	p.header(`Content-Length`, pc.FileSize)
	if pc.Raw == nil {
		zj.J(`raw gzip file`, pc.Path)
		p.sendFile(pc.Path)
	} else {
		zj.J(`raw gzip memory`, pc.Path)
		p.w.Write(pc.Raw)
	}
}
