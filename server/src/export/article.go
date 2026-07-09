package export

import (
	"fmt"
	"project/pb"
	"project/pg"
	"project/util"
	"project/zj"
	"slices"
)

func ArticleFile(name string) string {
	return fmt.Sprintf(`%s/article/%s.bin`, DataDir, name)
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
		dst := pb.RenderArticleYear_builder{
			Year: &y,
		}
		for _, raw := range data.year[y] {
			mid := raw.GetMetaRevisionId()
			meta, e2 := pg.GetMeta(mid)
			if e2 != nil {
				zj.WF(`get item %d meta %d failed: %s`, raw.GetId(), mid, e2.Detail)
				continue
			}
			it := pb.RenderArticleItem_builder{
				Id:       new(raw.GetId()),
				Meta:     meta,
				TsCreate: new(raw.GetTsCreate()),
			}.Build()

			dst.List = append(dst.List, it)

		}

		d.List[idx] = dst.Build()
	}

	g.addFail(
		`article `+name,
		util.WriteStaticData(ArticleFile(name), d.Build()),
	)
}
