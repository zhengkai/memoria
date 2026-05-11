package page

import (
	"project/util"
	"strconv"
)

type IContent interface {
	GetContent() *Content
}

type Content struct {
	util.StaticFile
	Size string
	Data []byte
}

func (p *Content) Import(sf *util.StaticFile, size int64) {
	p.StaticFile = *sf
	p.Size = strconv.FormatInt(size, 10)
}

func (p *Content) GetContent() *Content {
	return p
}
