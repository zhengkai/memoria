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

func (m *Manager) makeTpl(file ...string) *template.Template {

	tplList := make([]string, 0, len(file)+len(commonTpl))
	for _, f := range file {
		tplList = append(tplList, "tpl/"+f+".html")
	}
	tplList = append(tplList, commonTpl...)

	return template.Must(
		template.New(`layout`).Funcs(m.tplFunc).ParseFS(tplFS,
			tplList...,
		),
	)
}

func execTpl(tpl *template.Template, data any) ([]byte, error) {

	var buf bytes.Buffer

	err := tpl.Execute(&buf, data)
	if err != nil {
		zj.W(`execTpl fail:`, err)
		return nil, err
	}
	return buf.Bytes(), nil
}

func execTplToFile(file string, tpl *template.Template, data IMeta) (output []byte, err error) {

	output, err = execTpl(tpl, data)
	if err != nil {
		return nil, err
	}

	hash := sha256.Sum256(output)

	prev, err := util.ReadStaticHash(file)

	status := "replace"
	if err == nil {
		if prev == hash {
			// zj.IO(`hash match, skip`, file)
			return
		}
	} else {
		status = "new"
		os.MkdirAll(filepath.Dir(util.Static(file)), 0755)
	}

	zj.IO(`write`, status, file)
	err = util.WriteStaticBinHash(file, hash, output)
	return
}
