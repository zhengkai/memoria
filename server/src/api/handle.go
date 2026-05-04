package api

import "net/http"

func Handle(w http.ResponseWriter, r *http.Request) {
	gw := &Gateway{
		w: w,
		r: r,
	}

	body, ok := gw.readBody()
	if !ok {
		return
	}

	req, err := gw.unmarshalReq(body)
	if err != nil {
		return
	}

	gw.marshalRsp(gw.dispatch(req))
}
