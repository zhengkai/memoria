// Package page ...
package page

import (
	"embed"
)

//go:embed tpl/*.html
var tplFS embed.FS

var commonTpl = []string{
	"tpl/layout.html",
	"tpl/header.html",
	"tpl/footer.html",
}

var itemTpl = buildTpl("item")
