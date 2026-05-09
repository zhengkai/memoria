// Package page ...
package page

import (
	"embed"
	"html/template"
	"project/config"
	"project/pb"
	"project/zj"
)

//go:embed tpl/*.html
var tplFS embed.FS

var commonTpl = []string{
	`tpl/layout.html`,
	// `tpl/layout-simple.html`,
}

type Manager struct {
	forceRefresh bool

	noteYearList []*NoteYear

	Item map[uint64]*Item

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

func (m *Manager) IsInitDone() bool {
	if m == nil {
		return false
	}
	return m.initDone
}

func (m *Manager) initTpl() {
	m.homeTpl = m.makeTpl(`home`)
	m.articleIndexTpl = m.makeTpl(`article-index`)
	m.articleSingleTpl = m.makeTpl(`article`)
	m.noteTpl = m.makeTpl(`note`, `item`)
	m.errorTpl = m.makeTpl(`error`)
}

func (m *Manager) Init() error {

	var err error
	m.noteYearList, err = getNoteYearList()
	if err != nil {
		zj.W(`getNoteYearList fail`, err)
	}

	if len(m.noteYearList) > 0 {
		m.MaxNoteYear = m.noteYearList[0].Year
		m.MinNoteYear = m.noteYearList[len(m.noteYearList)-1].Year
	} else {
		m.MaxNoteYear = config.DefaultMaxNoteYear
		m.MinNoteYear = config.DefaultMinNoteYear
	}

	m.loadConfig()
	m.makeTplFunc()
	m.initTpl()

	m.styleLink = m.getStyleLink()
	m.faviconLink = m.linkPath(`/favicon.webp`)

	m.Item = make(map[uint64]*Item, 3000)

	if err := m.noteInit(); err != nil {
		zj.W(`noteInit fail`, err)
	}

	if err := m.articleInit(); err != nil {
		zj.W(`article fail`, err)
	}

	if err := m.homeInit(); err != nil {
		zj.W(`homeInit fail`, err)
	}

	if err := m.errorInit(); err != nil {
		zj.W(`errorInit fail`, err)
	}

	m.initDone = true
	return nil
}
