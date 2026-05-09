package public

import (
	"net/http"
	"project/export"
	"project/page"
)

func (p *public) style() {

	if !p.isSecure {
		p.error404()
		return
	}

	p.mime = page.MimeCSS
	p.expire = ExpireLong

	if p.etag != `` {
		p.w.WriteHeader(http.StatusNotModified)
		return
	}

	p.header(`Cache-Control`, ExpireLong)
	p.header(`Content-Type`, page.MimeCSS)
	p.header(`ETag`, `"forever"`)

	if p.headerOnly {
		return
	}

	p.disableETag = true
	p.sendFile(export.StyleFile)
}
