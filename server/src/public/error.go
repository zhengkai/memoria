package public

import (
	"net/http"
	"project/page"
	"project/zj"
)

func (p *public) error404() {
	p.errorPage(
		http.StatusNotFound,
		page.Error404File,
	)
}

func (p *public) error451() {
	p.errorPage(
		http.StatusUnavailableForLegalReasons,
		page.Error451File,
	)
}

func (p *public) error500() {
	p.errorPage(
		http.StatusInternalServerError,
		page.Error500File,
	)
}

func (p *public) errorPage(code int, file string) {
	zj.W(`error page`, code, p.path, file)
	p.w.WriteHeader(code)
	p.readPage(file)
}
