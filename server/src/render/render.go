// Package render 将 gen 的 static/data 转为 HTML
package render

import (
	"fmt"
	"project/gen"
	"project/pb"
	"project/util"
)

func renderFileName(revisionID uint64) string {
	return fmt.Sprintf(`data/render/%03d/%03d.html`, revisionID/1000, revisionID%1000)
}

func Render(it *pb.ItemDB) ([]byte, error) {

	file := renderFileName(it.GetRevisionId())
	ab, err := util.ReadStaticBin(file)
	if err == nil {
		return ab, nil
	}

	revFile := gen.RevisionFileName(it.GetRevisionId())

	rev := &pb.Revision{}
	err = util.ReadStaticData(revFile, rev)
	if err != nil {
		return nil, err
	}

	switch rev.GetFormat() {
	case pb.Format_PLAIN:
		ab, err = Plain(rev.GetRaw())
	case pb.Format_MARKDOWN:
		ab, err = Markdown(rev.GetRaw())
	case pb.Format_ASCIIDOC:
		ab, err = ASCIIDoc(rev.GetRaw())
	}

	return ab, err
}
