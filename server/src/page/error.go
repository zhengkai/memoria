package page

import (
	"html/template"
)

var errorTpl = makeTpl(`error`)

var Error404File = `page/error/404.html`
var Error451File = `page/error/451.html`
var Error500File = `page/error/500.html`

type Error struct {
	Meta    *Meta
	Title   string
	Content template.HTML
}

func (p *Page) errorInit() error {

	p.errorMeta = genMeta(`error`)

	p.genError(
		Error404File,
		`HTTP Error 404: Not Found`,
		`您访问的页面不存在，可以点击上方导航条访问其他页面。`,
	)

	p.genError(
		Error451File,
		`HTTP Error 451: Unavailable For Legal Reasons`,
		`尽管没有关部门要求，<br>也不知道要根据何种相关法律、法规，<br>基于对未知风险的评估，<br>本网页决定不予显示。`,
	)

	p.genError(
		Error500File,
		`HTTP Error 500: Internal Server Error`,
		`服务器挂了，请稍后再试。`,
	)

	return nil
}

func (p *Page) genError(file string, title string, content template.HTML) error {

	if p.checkFastPass(Error404File) {
		return nil
	}

	d := &Error{
		Meta:    p.errorMeta,
		Title:   title,
		Content: content,
	}
	return execTplToFile(file, errorTpl, d)
}
