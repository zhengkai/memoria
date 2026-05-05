package page

import "html/template"

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

	meta := genMeta(`error`)

	d404 := &Error{
		Meta:    meta,
		Title:   `HTTP Error 404: Not Found`,
		Content: `您访问的页面不存在，可以点击上方导航条访问其他页面。`,
	}
	execTplToFile(Error404File, errorTpl, d404)

	d451 := &Error{
		Meta:    meta,
		Title:   `HTTP Error 451: Unavailable For Legal Reasons`,
		Content: `尽管没有关部门要求，<br>也不知道要根据何种相关法律、法规，<br>基于对未知风险的评估，<br>本网页决定不予显示。`,
	}
	execTplToFile(Error451File, errorTpl, d451)

	d500 := &Error{
		Meta:    meta,
		Title:   `HTTP Error 500: Internal Server Error`,
		Content: `服务器挂了，请稍后再试。`,
	}
	execTplToFile(Error500File, errorTpl, d500)

	return nil
}
