// Package page ...
package page

import (
	"embed"
	"html/template"
	"project/config"
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

	tplFunc template.FuncMap

	styleHash   string
	maxItemID   uint64
	MaxNoteYear uint32
	MinNoteYear uint32

	errorMeta *Meta

	styleLink   string
	faviconLink string

	homeTpl          *template.Template
	articleIndexTpl  *template.Template
	articleSingleTpl *template.Template
	noteTpl          *template.Template
	errorTpl         *template.Template
}

func (p *Page) IsInitDone() bool {
	if p == nil {
		return false
	}
	return p.initDone
}

func (p *Page) initTpl() {
	p.homeTpl = p.makeTpl(`home`)
	p.articleIndexTpl = p.makeTpl(`article-index`)
	p.articleSingleTpl = p.makeTpl(`article`)
	p.noteTpl = p.makeTpl(`note`, `item`)
	p.errorTpl = p.makeTpl(`error`)
}

func (p *Page) Init(fast bool) error {

	p.fast = fast

	var err error
	p.NoteYearList, err = getNoteYearList()
	if err != nil {
		zj.W(`getNoteYearList fail`, err)
	}

	if len(p.NoteYearList) > 0 {
		p.MaxNoteYear = p.NoteYearList[0].Year
		p.MinNoteYear = p.NoteYearList[len(p.NoteYearList)-1].Year
	} else {
		p.MaxNoteYear = config.DefaultMaxNoteYear
		p.MinNoteYear = config.DefaultMinNoteYear
	}

	p.loadConfig()
	p.makeTplFunc()
	p.initTpl()

	p.styleLink = p.getStyleLink()
	p.faviconLink = p.linkPath(`/favicon.webp`)

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
