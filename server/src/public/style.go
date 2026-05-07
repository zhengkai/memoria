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

	p.w.Header().Add(`Cache-Control`, ExpireLong)
	p.w.Header().Add(`Content-Type`, MimeCSS)
	p.w.Header().Add(`ETag`, `"forever"`)

	if p.headerOnly {
		return
	}

	p.disableETag = true
	p.sendFile(export.StyleFile)
}
