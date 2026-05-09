package page

import (
	"html/template"
	"time"
)

func (m *Manager) makeTplFunc() {
	m.tplFunc = template.FuncMap{
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
		"linkItem": func(id uint64) string {
			return m.config.GetPathPrefix() + LinkItem(id)
		},
		"linkNote": func(year uint32) string {
			return m.config.GetPathPrefix() + LinkNote(year)
		},
		"linkNoteMax": func() string {
			return m.config.GetPathPrefix() + LinkNote(m.MaxNoteYear)
		},
		"linkArticle": func() string {
			return m.config.GetPathPrefix() + LinkArticle
		},
		"linkHome": func() string {
			return m.config.GetPathPrefix() + LinkHome
		},
	}
}
