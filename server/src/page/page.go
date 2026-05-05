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

func NewPage() *Page {
	p := &Page{}
	if err := p.Init(); err != nil {
		zj.W(err)
		return nil
	}
	return p
}

type Page struct {
	forceRefresh bool

	NoteYearList []*NoteYear
	Note         map[uint32]*Note

	Item map[uint64]*Item

	initDone bool
}

func (p *Page) IsInitDone() bool {
	if p == nil {
		return false
	}
	return p.initDone
}

func (p *Page) Init() error {
	p.Item = make(map[uint64]*Item, 3000)

	if err := p.noteInit(); err != nil {
		zj.W(`noteInit fail`, err)
	}

	if err := p.articleInit(); err != nil {
		zj.W(`article fail`, err)
	}

	if err := p.homeInit(); err != nil {
		zj.W(`homeInit fail`, err)
	}

	if err := p.errorInit(); err != nil {
		zj.W(`errorInit fail`, err)
	}

	p.initDone = true
	return nil
}
