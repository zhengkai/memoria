package web

import (
	"net/http"
	"project/config"
	"project/public"
	"strings"

	"github.com/prometheus/client_golang/prometheus/promhttp"
)

var promHandler = promhttp.Handler()

func metricsHandle(w http.ResponseWriter, r *http.Request) {

	if !strings.HasSuffix(r.URL.Path, config.Key) {
		public.Handle.ServeHTTP(w, r)
		return
	}

	promHandler.ServeHTTP(w, r)
}
