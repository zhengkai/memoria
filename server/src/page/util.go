package page

import (
	"fmt"
	"html/template"
)

func buildTpl(file ...string) *template.Template {

	tplList := make([]string, 0, len(file)+len(commonTpl))
	for _, f := range file {
		tplList = append(tplList, "tpl/"+f+".html")
	}
	// add common
	tplList = append(tplList, commonTpl...)

	fmt.Println(tplList)

	return template.Must(
		template.ParseFS(tplFS,
			tplList...,
		),
	)
}
