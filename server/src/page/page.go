// Package page ...
package page

import (
	"embed"
	"project/pb"
	"project/util"
	"project/zj"
)

//go:embed tpl/*.html
var tplFS embed.FS

var commonTpl = []string{
	`tpl/layout.html`,
	// `tpl/layout-simple.html`,
}

type Page struct {
	forceRefresh bool

	NoteYearList []*NoteYear
	Note         map[uint32]*Note

	Item map[uint64]*Item

	fast bool

	initDone bool

	config *pb.PageConfig

	maxItemID uint64

	errorMeta *Meta
}

func (p *Page) IsInitDone() bool {
	if p == nil {
		return false
	}
	return p.initDone
}

func (p *Page) Init(fast bool) error {

	p.fast = fast

	p.loadConfig()

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

// 快速启动时，有文件就先用着
func (p *Page) checkFastPass(file string) bool {
	if !p.fast {
		return false
	}
	return util.StaticExists(file)
}
