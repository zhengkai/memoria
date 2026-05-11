package config

import "time"

var (
	StartTime = time.Now()
)

const (
	DefaultMaxNoteYear uint32 = 2020
	DefaultMinNoteYear uint32 = 2010

	BeyondProxy = true

	DirFileMode = 0775
	FileMode    = 0664
)
