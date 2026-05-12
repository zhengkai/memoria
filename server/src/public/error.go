package public

import (
	"fmt"
	"net/http"
	"project/metrics"
	"project/page"
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

	metrics.ErrorCount(code)

	if p.pm != nil {
		pc, ok := p.pm.PageCache[fmt.Sprintf(`/error/%d.html`, code)]
		if ok {
			p.cache(pc)
			return
		}
	}

	file := page.FileError(code)

	p.WriteHeader(code)
	p.sendFile(file)
}
