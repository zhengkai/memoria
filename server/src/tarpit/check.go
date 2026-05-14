// Package tarpit 反击
package tarpit

import (
	"project/util"
	"strings"
)

func Check(h *util.HTTP) bool {

	hit := check(h)
	if hit {
		t := &tarpit{*h, 0, util.BenchStart()}
		t.Attack()
	}

	return hit
}

func check(h *util.HTTP) bool {

	if strings.HasPrefix(h.R.Header.Get(`referer`), `http`) {
		return false
	}

	path := h.R.URL.Path

	if strings.HasPrefix(path, `/.`) {
		return true
	}
	if strings.HasPrefix(path, `/wp-`) {
		return true
	}
	return false
}
