package page

import (
	"bytes"
	"project/pb"
	"project/zj"
)

func Run() {

	item := &pb.ItemDB{}

	var buf bytes.Buffer

	err := itemTpl.ExecuteTemplate(&buf, `layout`, item)
	zj.W(`page`, err)

	zj.IO(buf.String())
}
