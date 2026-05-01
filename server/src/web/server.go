// Package web
package web

import (
	"project/api"
	"project/gen"
	"project/util"

	"net/http"
	"project/config"
	"project/metrics"
	"project/zj"
	"time"
)

func Server() {

	mux := http.NewServeMux()

	mux.HandleFunc(`/robots.txt`, robotsHandle)
	mux.HandleFunc(`/api/gen`, gen.TestHandle)
	mux.Handle(`/api`, api.Handler)

	if config.ClientDir == `` {
		mux.HandleFunc(`/`, failbackHandle)
	} else {
		if util.DirCanRead(config.ClientDir) {
			zj.J(`service client dist at`, config.ClientDir)
			mux.Handle("/", http.FileServer(http.Dir(config.ClientDir)))
		} else {
			zj.W(`client dir can not read`, config.ClientDir)
		}
	}

	s := &http.Server{
		Addr:         config.WebAddr,
		Handler:      mux,
		ReadTimeout:  30 * time.Second,
		WriteTimeout: 30 * time.Second,
		IdleTimeout:  30 * time.Second,
	}

	zj.J(`start web server`, s.Addr)

	err := s.ListenAndServe()
	if err != nil {
		zj.W(err)
		return
	}
}

func failbackHandle(w http.ResponseWriter, r *http.Request) {
	metrics.ErrorCount(http.StatusNotFound)
	zj.J(`failback handle`, r.URL.String())
}

func robotsHandle(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/plain")
	w.Write([]byte("User-agent: *\nDisallow: /\n"))
}
