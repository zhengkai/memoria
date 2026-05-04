package page

import (
	"bytes"
	"html/template"
	"project/zj"
)

func makeTpl(file ...string) *template.Template {

	tplList := make([]string, 0, len(file)+len(commonTpl))
	for _, f := range file {
		tplList = append(tplList, "tpl/"+f+".html")
	}
	tplList = append(tplList, commonTpl...)

	return template.Must(
		template.New("layout").Funcs(tplFunc).ParseFS(tplFS,
			tplList...,
		),
	)
}

func execTpl(tpl *template.Template, data any) ([]byte, error) {

	var buf bytes.Buffer

	err := noteTpl.Execute(&buf, data)
	if err != nil {
		zj.W(`execTpl fail:`, err)
	}
	return buf.Bytes(), err
}
