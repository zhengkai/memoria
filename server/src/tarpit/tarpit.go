package tarpit

import (
	"math/rand"
	"net/http"
	"project/page"
	"project/util"
)

type tarpit struct {
	util.HTTP
}

func (t *tarpit) Attack() {

	t.Header(`Content-Type`, page.MimeHTML)
	t.W.WriteHeader(http.StatusOK)

	if rand.Intn(2) == 0 {
		t.Sleep()
	} else {
		t.Flood()
	}
}
