// Package util
package util

import (
	"project/zj"

	"google.golang.org/protobuf/encoding/prototext"
	"google.golang.org/protobuf/proto"
)

func ClonePB[T interface {
	*E
	proto.Message
}, E any](m T) T {
	return proto.Clone(m).(T)
}

func DebugPB(m proto.Message) {
	zj.IO(prototext.Format(m))
}
