package migrate

import (
	"net/http"
)

var isRun bool

func Handle(w http.ResponseWriter, r *http.Request) {

	if isRun {
		w.Write([]byte(`migrate done`))
		return
	}
	isRun = true

	w.Write([]byte(`migrate start`))

	go run()
}
