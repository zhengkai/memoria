package tarpit

import (
	"net/http"
	"project/metrics"
	"time"
)

func (t *tarpit) Flood() {
	if junk == nil {
		t.Sleep()
		return
	}

	metrics.TarpitCount(`flood`)

	flusher, _ := t.W.(http.Flusher)
	for {
		select {
		case <-t.R.Context().Done():
			return
		default:
			time.Sleep(time.Millisecond)

			_, err := t.W.Write([]byte(`<div>stop, go away`))
			if err != nil {
				return
			}

			_, err = t.W.Write(junk)
			if err != nil {
				return
			}
			if flusher != nil {
				flusher.Flush()
			}
		}
	}
}
