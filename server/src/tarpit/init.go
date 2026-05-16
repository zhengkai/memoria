package tarpit

import (
	"bytes"
	"compress/gzip"
	"io"
	"math/rand"
	"time"
)

func init() {
	go func() {
		makeJunk()
		makeBomb()
	}()
}

func makeJunk() {
	buf := make([]byte, 65535)
	rng := rand.New(rand.NewSource(time.Now().UnixNano()))
	for i := range buf {
		buf[i] = byte(rng.Intn(256))
	}
	junk = buf
}

func makeBomb() {
	var buf bytes.Buffer
	w, _ := gzip.NewWriterLevel(&buf, gzip.BestCompression)
	io.CopyN(w, zeroReader{}, 10<<30)
	w.Close()
	bomb = buf.Bytes()
}
