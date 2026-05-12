// Package tarpit 反击
package tarpit

import (
	"project/util"
	"strings"
)

func Check(h *util.HTTP) bool {

	return false

	hit := check(h)
	if !hit {
		// TODO
		return false
	}

	return true
}

func check(h *util.HTTP) bool {

	path := h.R.URL.Path
	if strings.HasPrefix(path, `/.`) {
		return true
	}
	if strings.HasPrefix(path, `/wp-`) {
		return true
	}
	return false
}
