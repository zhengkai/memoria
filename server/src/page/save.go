package page

import (
	"html/template"
	"project/zj"
)

func (m *Manager) genPage(file string, data IMeta, tpl *template.Template) {

	ab, err := execTplToFile(file, tpl, data)
	if err != nil {
		zj.J(`execTplToFile fail`, err)
	}
	if ab == nil {
		return
	}

	m.PageCache[data.GetCanonical()] = &Page{
		File: file,
		Mime: MimeHTML,

		Raw: ab,
	}

	// zj.J(file, len(ab), err)

	// zj.J(`meta`, m)
}
