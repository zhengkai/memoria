package util

import "net/http"

type HTTP struct {
	W http.ResponseWriter
	R *http.Request
}

func (h *HTTP) Header(k, v string) {
	h.W.Header().Set(k, v)
}
func (h *HTTP) WriteHeader(code int) {
	h.W.WriteHeader(code)
}
