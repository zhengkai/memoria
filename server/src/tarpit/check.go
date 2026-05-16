// Package tarpit 反击
package tarpit

import (
	"project/util"
	"strings"
)

func Check(h *util.HTTP) bool {

	hit := check(h)
	if hit {
		Attack(h)
	}

	return hit
}

func check(h *util.HTTP) bool {

	if strings.HasPrefix(h.R.Header.Get(`referer`), `http`) {
		return false
	}

	path := h.R.URL.Path

	if strings.HasPrefix(path, `/.`) {
		// RFC 8615 https://en.wikipedia.org/wiki/Well-known_URI
		return !strings.HasPrefix(path, `/.well-known/`)
	}
	if strings.HasPrefix(path, `/wp-`) {
		return true
	}
	return false
}
