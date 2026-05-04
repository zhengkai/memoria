package page

import (
	"html/template"
	"time"
)

var tplFunc = template.FuncMap{
	"date": func(ts uint64) string {
		t := time.Unix(int64(ts/1000), 0)
		return t.Format(time.DateOnly)
	},
	"datetime": func(ts uint64) string {
		t := time.Unix(int64(ts/1000), 0)
		return t.Format(time.DateTime)
	},
	"RFC3339": func(ts uint64) string {
		t := time.Unix(int64(ts/1000), 0)
		return t.Format(time.RFC3339)
	},
}
