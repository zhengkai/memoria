package export

import (
	"net/http"
	"strings"
)

func Handle(w http.ResponseWriter, r *http.Request) {

	isFull := strings.HasSuffix(r.URL.RawQuery, `full`)

	if Run(isFull) {
		w.Write([]byte(`export start`))
		return
	}
	w.Write([]byte(`export locked`))
}
