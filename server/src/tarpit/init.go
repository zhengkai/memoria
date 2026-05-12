package tarpit

import (
	"math/rand"
	"time"
)

var junk []byte

func init() {

	go func() {

		buf := make([]byte, 65535)
		rng := rand.New(rand.NewSource(time.Now().UnixNano()))
		for i := range buf {
			buf[i] = byte(rng.Intn(256))
		}

	}()
}
