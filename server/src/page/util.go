package page

import (
	"bytes"
	"crypto/sha256"
	"html/template"
	"io"
	"os"
	"path/filepath"
	"project/config"
	"project/util"
	"project/zj"
)

type Template interface {
	Execute(wr io.Writer, data any) error
}

type tplOutput struct {
	file    string
	raw     []byte
	hash    [sha256.Size]byte
	ok      bool
	writeOK bool // 指写入成功，或者有 hash 一致的文件存在
	err     error
}

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

func execTpl(tpl Template, data any) ([]byte, error) {

	var buf bytes.Buffer

	err := tpl.Execute(&buf, data)
	if err != nil {
		zj.W(`execTpl fail:`, err)
		return nil, err
	}
	return buf.Bytes(), nil
}

func execTplToFile(file string, tpl Template, data IMeta) (*tplOutput, error) {

	output, err := execTpl(tpl, data)
	if err != nil {
		return nil, err
	}

	o := &tplOutput{
		file: file,
		raw:  output,
		hash: sha256.Sum256(output),
		ok:   true,
		err:  nil,
	}

	prev, err := util.ReadStaticHash(file)

	status := "replace"
	if err == nil {
		if prev == o.hash {
			// zj.IO(`hash match, skip`, file)
			o.writeOK = true
			return o, nil
		}
	} else {
		status = "new"
		os.MkdirAll(filepath.Dir(util.Static(file)), config.DirFileMode)
	}

	zj.IO(`write`, status, file)
	err = util.WriteStaticBinHash(file, o.hash, output)
	if err == nil {
		o.writeOK = true
	}
	return o, nil
}
