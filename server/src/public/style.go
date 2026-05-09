package public

import (
	"net/http"
	"project/export"
)

func (p *public) style() {

	if !p.isSecure {
		p.error404()
		return
	}

	p.mime = MimeCSS
	p.expire = ExpireLong

	if p.etag != `` {
		p.w.WriteHeader(http.StatusNotModified)
		return
	}

	p.header(`Cache-Control`, ExpireLong)
	p.header(`Content-Type`, MimeCSS)
	p.header(`ETag`, `"forever"`)

	if p.headerOnly {
		return
	}

	p.disableETag = true
	p.sendFile(export.StyleFile)
}
