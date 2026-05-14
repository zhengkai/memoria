package tarpit

import (
	"net/http"
	"project/page"
	"project/util"
	"project/zj"
)

type tarpit struct {
	util.HTTP
	sum int
	bs  util.BenchTime
}

func (t *tarpit) Attack() {

	t.Header(`Content-Type`, page.MimeHTML)
	t.W.WriteHeader(http.StatusOK)

	zj.J(`tarpit start`, t.IP)

	t.Flood()
	// if rand.Intn(2) == 0 {
	// 	t.Sleep()
	// } else {
	// 	t.Flood()
	// }

	zj.J(`tarpit end`, t.IP, t.bs)
}

func (t *tarpit) Write(ab []byte) (int, error) {
	i, err := t.W.Write(ab)
	if err == nil {
		t.sum += i
	}
	return i, err
}
