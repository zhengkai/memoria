package page

import (
	"crypto/sha256"
	"fmt"
	"project/export"
	"project/util"
)

func (m *Manager) getStyleLink() string {

	f := util.NewStaticFile(export.StyleFile)

	ab, _ := f.ReadBin()
	f.Hash = new(sha256.Sum256(ab))

	link := fmt.Sprintf(`/style-%x.css`, f.Hash[:6])

	pc := &Page{
		Mime:    MimeCSS,
		Forever: true,
	}
	pc.Import(f, int64(len(ab)))
	m.PageCache[link] = pc

	pc.compress()

	return link
}
