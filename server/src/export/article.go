package export

import (
	"fmt"
	"project/pb"
	"project/util"
	"project/zj"
	"slices"
)

func ArticleFile(name string) string {
	return fmt.Sprintf(`data/article/%s.bin`, name)
}

func (g *Export) exportArticle() {

	zj.J(`export article`)

	for name, data := range map[string]*ByYear{
		`article`: g.article,
		`curated`: g.curated,
		`trash`:   g.trash,
		`full`:    g.articleFull,
	} {
		g.exportArticleEach(name, data)
	}
}

func (g *Export) exportArticleEach(name string, data *ByYear) {

	var yl []uint32
	for y, li := range data.year {
		yl = append(yl, y)
		sortItemList(li)
	}

	slices.Sort(yl)
	slices.Reverse(yl)

	d := pb.RenderArticleIndex_builder{
		List: make([]*pb.RenderArticleYear, len(yl)),
	}

	for idx, y := range yl {
		src := data.year[y]
		dst := pb.RenderArticleYear_builder{
			Year: &y,
			List: make([]*pb.ItemLite, len(src)),
		}
		for idx, it := range src {
			lite := pb.ItemLite_builder{
				Id:   new(it.GetId()),
				Meta: it.GetMeta(),
			}.Build()
			dst.List[idx] = lite
		}
		d.List[idx] = dst.Build()
	}

	g.addFail(
		`article `+name,
		util.WriteStaticData(ArticleFile(name), d.Build()),
	)
}
