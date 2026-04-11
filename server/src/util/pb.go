// Package util
package util

import (
	"project/zj"

	"google.golang.org/protobuf/encoding/prototext"
	"google.golang.org/protobuf/proto"
	"google.golang.org/protobuf/reflect/protoreflect"
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

func IsEmptyPB(m proto.Message) bool {
	if m == nil {
		return true
	}
	isEmpty := true
	m.ProtoReflect().Range(func(fd protoreflect.FieldDescriptor, v protoreflect.Value) bool {
		isEmpty = false
		return false
	})
	return isEmpty
}
