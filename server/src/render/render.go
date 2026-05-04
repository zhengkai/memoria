// Package render 将 export 的 static/data 转为 HTML
package render

import (
	"fmt"
	"project/export"
	"project/pb"
	"project/util"
)

func renderFileName(revisionID uint64) string {
	return fmt.Sprintf(`data/render/%03d/%03d.html`, revisionID/1000, revisionID%1000)
}

var renderMap = map[pb.Format_Enum]func(string) ([]byte, error){
	pb.Format_PLAIN:    Plain,
	pb.Format_MARKDOWN: Markdown,
	pb.Format_ASCIIDOC: ASCIIDoc,
}

func Render(it *pb.ItemDB) ([]byte, error) {

	file := renderFileName(it.GetRevisionId())
	ab, err := util.ReadStaticBin(file)
	if err == nil {
		// zj.IO(`read render file success:`, file)
		return ab, nil
	}

	revFile := export.RevisionFile(it.GetRevisionId())

	rev := &pb.Revision{}
	err = util.ReadStaticData(revFile, rev)
	if err != nil {
		return nil, err
	}

	fn, ok := renderMap[rev.GetFormat()]
	if !ok {
		return nil, fmt.Errorf(`unsupported format: %v`, rev.GetFormat().String())
	}
	ab, err = fn(rev.GetRaw())
	if err != nil {
		return nil, err
	}

	go util.WriteStaticBin(file, ab)

	return ab, nil
}
