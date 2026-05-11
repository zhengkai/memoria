package config

// config
var (
	Prod bool
	Dir  string

	Publish bool // publish 模式：关闭 admin，只允许根据 data 渲染显示页面

	WebAddr   = `:80`
	MySQL     = `memoria:memoria@/memoria`
	StaticDir = `/static`
	ClientDir = ``

	Key = ``
)
