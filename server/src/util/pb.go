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
		if isDefaultValue(fd, v) {
			return true
		}
		isEmpty = false
		return false
	})
	return isEmpty
}

func isDefaultValue(fd protoreflect.FieldDescriptor, v protoreflect.Value) bool {
	if fd.IsList() {
		return v.List().Len() == 0
	}
	if fd.IsMap() {
		return v.Map().Len() == 0
	}
	if fd.Kind() == protoreflect.MessageKind || fd.Kind() == protoreflect.GroupKind {
		return !v.Message().IsValid()
	}
	return v.Interface() == fd.Default().Interface()
}
