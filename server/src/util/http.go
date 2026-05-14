package util

import (
	"net/http"
	"project/config"
	"strings"
)

type HTTP struct {
	W  http.ResponseWriter
	R  *http.Request
	IP string
}

func (h *HTTP) GetIP() string {
	if h.IP == `` {
		if config.BeyondProxy {
			h.IP = strings.TrimPrefix(h.R.Header.Get(`X-Real-IP`), `::ffff:`)
		} else {
			h.IP = strings.SplitN(h.R.RemoteAddr, `:`, 2)[0]
		}
	}
	return h.IP
}

func (h *HTTP) Header(k, v string) {
	h.W.Header().Set(k, v)
}
func (h *HTTP) WriteHeader(code int) {
	h.W.WriteHeader(code)
}
