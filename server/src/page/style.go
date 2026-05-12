package page

import (
	"crypto/sha256"
	"fmt"
	"project/config"
	"project/export"
	"project/util"
)

func (m *Manager) getStyleLink() string {

	f := util.NewStaticFile(export.StyleFile)

	ab, _ := f.ReadBin()
	f.Hash = new(sha256.Sum256(ab))

	link := fmt.Sprintf(`/style-%x.css`, f.Hash[:6])
	if !config.Prod { // 开发环境下固定名字，便于 devtools 里 local overrides
		link = `/style.css`
	}

	pc := &Page{
		Mime:          MimeCSS,
		Forever:       true,
		HeaderExpires: ExpireLong,
	}
	pc.Import(f, int64(len(ab)))
	m.PageCache[link] = pc

	pc.compress()

	return link
}
