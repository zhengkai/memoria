package config

import "time"

var (
	StartTime = time.Now()
)

const (
	UseNginx       = false
	NginxAccelPath = `/inter-file/%s/%s.bin`

	DefaultMaxNoteYear uint32 = 2020
	DefaultMinNoteYear uint32 = 2010
)
