package tarpit

import (
	"math/rand"
	"net/http"
	"project/ban"
	"project/metrics"
	"project/page"
	"project/util"
	"project/zj"
	"time"
)

func Attack(h *util.HTTP) {
	ban.Add(h.IP)
	t := &tarpit{*h, 0, util.BenchStart(), ``}
	t.Attack()
}

func (t *tarpit) Attack() {

	t.Header(`Content-Type`, page.MimeHTML)
	t.W.WriteHeader(http.StatusOK)

	zj.J(`tarpit start`, t.IP, t.R.URL)

	actions := []func(){
		t.Sleep,
		t.Bomb,
		t.Flood,
	}
	actions[rand.Intn(len(actions))]()

	timeCost := time.Since(time.Time(t.bs)) / time.Millisecond
	metrics.Tarpit(t.weapon, t.sum, timeCost)

	zj.J(`tarpit   end`, t.IP, t.weapon, util.FormatBytes(t.sum), t.bs)
}
