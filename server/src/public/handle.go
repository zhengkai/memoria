package public

import "net/http"

func Handle(w http.ResponseWriter, r *http.Request) {
	p := &public{
		w: w,
		r: r,
	}
	p.run()
}
