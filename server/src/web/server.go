// Package web
package web

import (
	"project/api"

	"net/http"
	"project/config"
	"project/metrics"
	"project/zj"
	"time"
)

func Server() {

	mux := http.NewServeMux()

	mux.Handle(`/api`, api.Handler)

	mux.HandleFunc(`/`, failbackHandle)

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
