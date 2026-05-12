package page

type Expire string

const (
	ExpireLong   Expire = `max-age=31536000, immutable`
	ExpireMiddle Expire = `max-age=86400, immutable`
	ExpireShort  Expire = `max-age=600, immutable`
)
