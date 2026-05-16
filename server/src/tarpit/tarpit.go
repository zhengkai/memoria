package tarpit

import (
	"project/util"
)

var alertMsg = []byte(`<div>stop, go away `)

type tarpit struct {
	util.HTTP
	sum    int
	bs     util.BenchTime
	weapon string
}

func (t *tarpit) Write(ab []byte) (int, error) {
	i, err := t.W.Write(ab)
	if err == nil {
		t.sum += i
	}
	return i, err
}
