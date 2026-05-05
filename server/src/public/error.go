package public

import (
	"net/http"
	"project/page"
)

func (p *public) error404() {
	p.w.WriteHeader(http.StatusNotFound)
	p.readPage(page.Error404File)
}

func (p *public) error451() {
	p.w.WriteHeader(http.StatusUnavailableForLegalReasons)
	p.readPage(page.Error451File)
}

func (p *public) error500() {
	p.w.WriteHeader(http.StatusInternalServerError)
	p.readPage(page.Error500File)
}
