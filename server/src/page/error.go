package page

import (
	"fmt"
	"html/template"
	"net/http"
)

type Error struct {
	Meta
	Title   string
	Content template.HTML
}

func (m *Manager) errorInit() error {

	m.genError(
		http.StatusNotFound,
		`您访问的页面不存在，可以点击上方导航条访问其他页面。`,
	)

	m.genError(
		http.StatusUnavailableForLegalReasons,
		`尽管没有关部门要求，<br>也不知道要根据何种相关法律、法规，<br>基于对未知风险的评估，<br>本网页决定不予显示。`,
	)

	m.genError(
		http.StatusInternalServerError,
		`服务器挂了，请稍后再试。`,
	)

	return nil
}

func (m *Manager) genError(code int, content template.HTML) {

	title := fmt.Sprintf(`HTTP Error %d: %s`, code, http.StatusText(code))

	d := &Error{
		Title:   title,
		Content: content,
	}
	m.setMeta(`error`, &d.Meta)
	d.Meta.Internal = true
	d.Canonical = fmt.Sprintf(`/error/%d.html`, code)

	m.genPage(FileError(code), d, m.errorTpl)
}
