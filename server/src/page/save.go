package page

import (
	"fmt"
	"html/template"
	"project/util"
	"project/zj"
	"strconv"
)

func (m *Manager) genPage(file string, data IMeta, tpl *template.Template) {

	output, err := execTplToFile(file, tpl, data)
	if err != nil {
		zj.W(`execTplToFile fail`, err)
	}
	if !output.ok {
		return
	}

	pc := &Page{
		StaticFile: util.NewStaticFile(file),
		Mime:       MimeHTML,
	}
	pc.Hash = &output.hash

	meta := data.GetMeta()
	pc.HeaderExpires = meta.HeaderExpires

	if !meta.Internal {
		pc.ETag = fmt.Sprintf(`"%x"`, pc.Hash[:7])
	}

	m.PageCache[meta.Canonical] = pc

	size := len(output.raw)
	pc.FileSize = strconv.Itoa(size)

	if size < memoryFileSizeLimit || !output.writeOK {
		pc.Raw = output.raw
	}

	if size > memoryCompressLimit && output.writeOK {
		pc.compress()
	}

	m.cacheSize += len(pc.Raw) + len(pc.Gzip.Data) + len(pc.Brotli.Data)
}
