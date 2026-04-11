// Package util
package util

import "google.golang.org/protobuf/proto"

func ClonePB[T interface {
	*E
	proto.Message
}, E any](m T) T {
	return proto.Clone(m).(T)
}
