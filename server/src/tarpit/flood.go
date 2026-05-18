package tarpit

import (
	"net/http"
	"project/config"
	"time"
)

var junk []byte

func (t *tarpit) Flood() {
	if junk == nil {
		t.Sleep()
		return
	}

	t.weapon = `flood`
	t.flood()
}

func (t *tarpit) flood() {

	flusher, _ := t.W.(http.Flusher)
	for {
		select {
		case <-t.R.Context().Done():
			return
		default:

			if config.Prod {
				time.Sleep(time.Microsecond)
			} else {
				time.Sleep(time.Second)
			}

			_, err := t.Write(alertMsg)
			if err != nil {
				return
			}

			_, err = t.Write(junk)
			if err != nil {
				return
			}
			if flusher != nil {
				flusher.Flush()
			}
		}
	}
}
