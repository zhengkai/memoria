package tarpit

import (
	"project/ban"
	"project/util"
)

func Attack(h *util.HTTP) {
	ban.Add(h.IP)
	t := &tarpit{*h, 0, util.BenchStart()}
	t.Attack()
}
