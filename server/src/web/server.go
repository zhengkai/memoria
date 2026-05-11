// Package web
package web

import (
	"project/api"
	"project/export"
	"project/public"
	"project/util"

	"net/http"
	"project/config"
	"project/zj"
	"time"
)

func Server() {

	mux := http.NewServeMux()

	if len(config.Key) > 20 {
		mux.HandleFunc(`/metrics/`, metricsHandle)
	} else {
		zj.W(`config key invalid, metrics disabled`)
	}

	if config.Publish {

		mux.Handle(`/`, public.Handle)

	} else {
		mux.HandleFunc(`/robots.txt`, robotsHandle)
		mux.HandleFunc(`/api/export`, export.Handle)
		mux.HandleFunc(`/api`, api.Handle)

		if config.ClientDir == `` {
			mux.Handle(`/`, public.Handle)
		} else {
			if util.DirCanRead(config.ClientDir) {
				zj.J(`service client dist at`, config.ClientDir)
				mux.Handle("/", http.FileServer(http.Dir(config.ClientDir)))
			} else {
				zj.W(`client dir can not read`, config.ClientDir)
			}
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

func robotsHandle(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/plain")
	if config.Publish {
		w.Write([]byte("User-agent: *\nAllow: /\n"))
	} else {
		w.Write([]byte("User-agent: *\nDisallow: /\n"))
	}
}
