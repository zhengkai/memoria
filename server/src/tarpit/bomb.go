package tarpit

import (
	"strings"
)

var bomb []byte

type zeroReader struct{}

func (zeroReader) Read(p []byte) (int, error) {
	clear(p)
	return len(p), nil
}

func (t *tarpit) Bomb() {

	if !strings.Contains(t.R.Header.Get(`Accept-Encoding`), `gzip`) {
		t.Flood()
		return
	}

	if bomb == nil {
		t.Sleep()
		return
	}

	t.Header(`Content-Type`, `text/plain`)
	t.Header(`Content-Encoding`, `gzip`)

	t.weapon = `bomb`

	for {
		_, err := t.Write(bomb)
		if err != nil {
			return
		}
	}
}
