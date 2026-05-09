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

type Manager struct {
	forceRefresh bool

	noteYearList []*NoteYear

	Item map[uint64]*Item

	config   *pb.PageConfig
	siteBase string

	tplFunc template.FuncMap

	PageCache map[string]*Page
	cacheSize int

	styleHash   string
	maxItemID   uint64
	MaxNoteYear uint32
	MinNoteYear uint32

	styleLink   string
	faviconLink string

	homeTpl          *template.Template
	articleIndexTpl  *template.Template
	articleSingleTpl *template.Template
	noteTpl          *template.Template
	errorTpl         *template.Template
}

func (m *Manager) initTpl() {
	m.homeTpl = m.makeTpl(`home`)
	m.articleIndexTpl = m.makeTpl(`article-index`)
	m.articleSingleTpl = m.makeTpl(`article`)
	m.noteTpl = m.makeTpl(`note`, `item`)
	m.errorTpl = m.makeTpl(`error`)
}

func (m *Manager) Init() error {

	m.PageCache = make(map[string]*Page, 1000)

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
	m.siteBase = `https://` + m.config.GetDomain() + m.config.GetPathPrefix()

	m.makeTplFunc()
	m.initTpl()

	m.styleLink = m.getStyleLink()
	m.faviconLink = m.FullLink(`/favicon.webp`)

	m.Item = make(map[uint64]*Item, 3000)

	m.noteInit()
	m.articleInit()
	m.homeInit()
	m.errorInit()

	zj.IO(`page memory cache size`, util.FormatBytes(m.cacheSize))

	return nil
}
