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

	HostName = `unknown`

	Key = ``

	PgSQL = `memoria:memoria@172.17.0.1:5432/memoria`
	// PgSQL = `anna:anna@anna:5432/memoria`
)
