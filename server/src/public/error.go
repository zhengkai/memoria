package public

import (
	"net/http"
	"project/page"
	"project/zj"
)

func (p *public) error404() {
	p.errorPage(http.StatusNotFound)
}

func (p *public) error451() {
	p.errorPage(http.StatusUnavailableForLegalReasons)
}

func (p *public) error500() {
	p.errorPage(http.StatusInternalServerError)
}

func (p *public) errorPage(code int) {
	p.disableETag = true

	file := page.FileError(code)

	zj.W(`error page`, code, p.path, file)
	p.w.WriteHeader(code)

	p.sendFile(file)
}
