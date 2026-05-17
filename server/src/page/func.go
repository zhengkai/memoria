package page

import (
	"bytes"
	"encoding/xml"
	"html/template"
	"strings"
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
		"linkItemFull": func(id uint64) string {
			return `https://` + m.config.GetDomain() + m.config.GetPathPrefix() + LinkItem(id)
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
		"rssEscape": func(in template.HTML) string {
			in = template.HTML(strings.ReplaceAll(string(in), `<img src="/file/`, `<img src="https://`+m.config.GetDomain()+`/file/`))
			var b bytes.Buffer
			xml.EscapeText(&b, []byte(in))
			return b.String()
		},
	}
}
