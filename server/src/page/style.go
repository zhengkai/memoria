package page

import (
	"crypto/sha256"
	"fmt"
	"project/export"
	"project/util"
	"strconv"
)

func (m *Manager) getStyleLink() string {

	ab, _ := util.ReadStaticBin(export.StyleFile)
	hash := sha256.Sum256(ab)

	link := fmt.Sprintf(`/style-%x.css`, hash[:6])

	pc := &Page{
		StaticFile: util.NewStaticFile(export.StyleFile),
		Mime:       MimeCSS,
		Forever:    true,
	}
	m.PageCache[link] = pc

	pc.Hash = &hash
	if len(ab) > 1000 {
		pc.FileSize = strconv.Itoa(len(ab))
	}
	pc.compress()

	return link
}
