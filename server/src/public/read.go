package public

import (
	"crypto/sha256"
	"fmt"
	"net/http"
	"project/util"
	"project/zj"
	"strconv"
	"strings"
)

func (p *public) readPage(file string) {

	c, err := util.ReadStaticBin(file)
	size := len(c) - sha256.Size
	if size < 10 {
		zj.W(`file content too short`, file)
		return
	}
	if err != nil {
		zj.W(file, err)
		if p.etag != "" {
			// 死马当活马医，出现问题时，让客户端继续用已有缓存
			p.w.WriteHeader(http.StatusNotModified)
		}
		p.error500()
		return
	}

	etag := fmt.Sprintf(`"%x"`, c[:5])
	if etag == p.etag {
		zj.J(`304`, etag, file)
		p.w.WriteHeader(http.StatusNotModified)
		return
	}

	// TODO 临时解决方案
	if strings.HasSuffix(file, `.css`) {
		size += sha256.Size
	}

	zj.J(`readPage`, etag, p.etag, p.path, file)

	p.w.Header().Add(`Cache-Control`, `max-age=31536000, immutable`)
	p.w.Header().Add(`Content-Type`, p.mime)
	p.w.Header().Add(`ETag`, etag)
	p.w.Header().Add(`Content-Length`, strconv.Itoa(size))

	if p.headerOnly {
		return
	}
	if strings.HasSuffix(file, `.css`) {
		p.w.Write(c)
		return
	}

	p.w.Write(c[sha256.Size:])
}
