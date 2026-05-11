package page

import (
	"fmt"
	"html/template"
	"project/config"
	"project/util"
	"project/zj"
)

func (m *Manager) genPage(file string, data IMeta, tpl *template.Template) {

	output, err := execTplToFile(file, tpl, data)
	if err != nil {
		zj.W(`execTplToFile fail`, err)
	}
	if !output.ok {
		return
	}

	size := len(output.raw)

	pc := &Page{
		Mime: MimeHTML,
	}
	pc.Import(util.NewStaticFile(file), int64(size))
	pc.Hash = &output.hash

	meta := data.GetMeta()
	pc.HeaderExpires = meta.HeaderExpires

	if !meta.Internal {
		pc.ETag = fmt.Sprintf(`"%x"`, pc.Hash[:7])
	}

	m.PageCache[meta.Canonical] = pc

	if config.MemoryFileSizeLimit < 1 ||
		size < config.MemoryFileSizeLimit ||
		!output.writeOK { // 写失败的文件也全放内存

		pc.Data = output.raw
	}

	if size > memoryCompressLimit && output.writeOK {
		pc.compress()
	}

	m.cacheSize += len(pc.Data) + len(pc.Gzip.Data) + len(pc.Brotli.Data)
}
