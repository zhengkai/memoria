package api

import "net/http"

func (gw *Gateway) error(msg string, code int) {
	http.Error(gw.w, msg, code)
}
