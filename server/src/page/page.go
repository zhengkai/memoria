// Package page ...
package page

import (
	"embed"
	"project/zj"
)

//go:embed tpl/*.html
var tplFS embed.FS

var commonTpl = []string{
	`tpl/layout.html`,
	// `tpl/layout-simple.html`,
}

var defaultPage *Page

func NewPage() error {
	p := &Page{}
	if err := p.Init(); err != nil {
		return err
	}
	defaultPage = p

	return nil
}

type Page struct {
	forceRefresh bool

	NoteYearList []*NoteYear
	Note         map[uint32]*Note

	Item map[uint64]*Item
}

func (p *Page) Init() error {
	p.Item = make(map[uint64]*Item, 3000)
	if err := p.noteInit(); err != nil {
		zj.W(`noteInit fail`, err)
	}
	if err := p.articleInit(); err != nil {
		zj.W(`article fail`, err)
	}
	return nil
}
