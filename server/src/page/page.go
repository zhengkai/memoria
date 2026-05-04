// Package page ...
package page

import (
	"embed"
)

//go:embed tpl/*.html
var tplFS embed.FS

var commonTpl = []string{
	// `tpl/layout.html`,
	`tpl/layout-simple.html`,
	`tpl/item.html`,
	`tpl/header.html`,
	`tpl/footer.html`,
}

var noteTpl = makeTpl(`note`)

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
		return err
	}
	return nil
}
