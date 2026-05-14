package config

import (
	"time"

	"google.golang.org/protobuf/encoding/protojson"
)

var (
	StartTime = time.Now()

	JSONUnmarshaler = protojson.UnmarshalOptions{
		DiscardUnknown: true,
	}

	JSONMarshaler = protojson.MarshalOptions{
		Multiline:         true,
		Indent:            `  `,
		UseProtoNames:     true,
		UseEnumNumbers:    true,
		EmitUnpopulated:   true,
		EmitDefaultValues: true,
	}
)

const (
	DefaultMaxNoteYear uint32 = 2020
	DefaultMinNoteYear uint32 = 2010

	BeyondProxy = true

	DirFileMode = 0775
	FileMode    = 0664

	MemoryFileSizeLimit = 0 // 少于此字节的文件放内存，否则 io.Copy， 0 表示全放内存
)
