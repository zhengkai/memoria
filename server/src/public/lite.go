package public

import (
	"net/http"
	"project/page"
	"project/util"
	"project/zj"
	"strings"
)

// 在 page 没有完全启动之前（因为要遍历一次所有文件），临时解决方法

func (p *public) liteError404() {
	p.liteError(http.StatusNotFound)
}

func (p *public) liteError451() {
	p.liteError(http.StatusUnavailableForLegalReasons)
}

func (p *public) liteError500() {
	p.liteError(http.StatusInternalServerError)
}

func (p *public) liteError(code int) {
}

func (p *public) litePage(pr page.Provider) {

	file := pr.File()
	if !util.StaticExists(file) {
		p.liteError404()
		return
	}
	if !p.isSecure {
		p.redirect(pr.Link())
		return
	}
	if p.headerOnly {
		return
	}

	zj.J(`lite hit`, file)

	mime := page.MimeHTML
	if strings.HasSuffix(file, `.css`) {
		mime = page.MimeCSS
	}
	p.Header(`Content-Type`, mime)
	p.Expire(page.ExpireShort)
	p.Header(`ETag`, `"temp"`)
	p.sendFile(file)
}
