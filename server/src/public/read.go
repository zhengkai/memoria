package public

import (
	"fmt"
	"net/http"
	"project/page"
	"project/util"
	"project/zj"
)

func (p *public) readPage(file string) {

	p.finalFile = file

	var etag string
	if p.disableETag {
		zj.J(`readPage no etag`, p.path, file)
	} else {
		h, err := util.ReadStaticHash(file)
		if err != nil {
			if p.etag != `` {
				// 死马当活马医，出现问题时，让客户端继续用已有缓存
				p.w.WriteHeader(http.StatusNotModified)
			}
			p.error500()
			return
		}

		etag = fmt.Sprintf(`"%x"`, h[:7])
		if etag == p.etag {
			zj.J(`304`, etag, file)
			p.w.WriteHeader(http.StatusNotModified)
			return
		}
		// zj.J(`readPage`, etag, p.etag, p.path, file)
	}

	p.header(`Cache-Control`, page.ExpireMiddle)
	p.header(`Content-Type`, p.mime)

	if !p.disableETag {
		p.header(`ETag`, etag)
	}

	if p.headerOnly {
		return
	}

	p.sendFile(file)
}
