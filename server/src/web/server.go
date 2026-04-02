package web

import (
	"net/http"
	"project/config"
	"project/metrics"
	"project/zj"
	"time"
)

// Server ...
func Server() {

	mux := http.NewServeMux()
	mux.HandleFunc(`/api`, apiHandle)
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

func apiHandle(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(`{"ok":true}`))
}

func failbackHandle(w http.ResponseWriter, r *http.Request) {
	metrics.ErrorCount(http.StatusNotFound)
	zj.J(`failback handle`, r.URL.String())
}
