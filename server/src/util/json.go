package util

import (
	"encoding/json"
	"project/config"
	"project/zj"

	"google.golang.org/protobuf/proto"
)

func JSON(x any) string {

	var ab []byte
	var err error

	if v, ok := x.(proto.Message); ok {
		ab, err = config.JSONMarshaler.Marshal(v)
		if err != nil {
			zj.W(`json err`, err)
			return ``
		}
		return string(ab)
	}

	ab, err = json.MarshalIndent(x, ``, `  `)
	if err != nil {
		zj.W(`json err`, err)
		return ``
	}
	return string(ab)
}
