package config

import "time"

var (
	StartTime = time.Now()
)

const (
	UseNginx       = false
	NginxAccelPath = `/inter-file/%s/%s.bin`
)
