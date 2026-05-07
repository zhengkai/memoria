package config

import "time"

var (
	StartTime = time.Now()
)

const (
	UseNginx = true

	DefaultMaxNoteYear uint32 = 2020
	DefaultMinNoteYear uint32 = 2010
)
