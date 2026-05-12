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

	if p.etag != `` {
		p.WriteHeader(http.StatusNotModified)
		return
	}

	p.Header(`Cache-Control`, page.ExpireLong)
	p.Header(`Content-Type`, page.MimeCSS)
	p.Header(`ETag`, `"forever"`)

	if p.headerOnly {
		return
	}

	p.disableETag = true
	p.sendFile(export.StyleFile)
}
