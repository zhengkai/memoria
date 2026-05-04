package page

import (
	"bytes"
	"crypto/sha256"
	"html/template"
	"os"
	"path/filepath"
	"project/util"
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

	err := tpl.Execute(&buf, data)
	if err != nil {
		zj.W(`execTpl fail:`, err)
	}
	return buf.Bytes(), err
}

func execTplToFile(file string, tpl *template.Template, data any) error {

	output, _ := execTpl(tpl, data)
	hash := sha256.Sum256(output)

	prev, err := util.ReadStaticHash(file)
	if err == nil {
		if prev == hash {
			// zj.IO(`hash match, skip`, file)
			return nil
		}
	} else {
		os.MkdirAll(filepath.Dir(util.Static(file)), 0755)
	}

	zj.IO(`write`, file)
	return util.WriteStaticBin(file, hash[:], output)
}
