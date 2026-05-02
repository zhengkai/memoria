package gen

import (
	"project/pb"
	"project/util"
	"project/zj"
	"slices"
)

const ArticleFileName = `data/article-list.bin`

func (g *Gen) genArticle() {

	zj.J(`gen article`)
	g.wg.Add(1)
	defer g.wg.Done()

	var yl []uint32
	for y, li := range g.article.year {
		yl = append(yl, y)
		sortItemList(li)
	}

	slices.Sort(yl)
	slices.Reverse(yl)

	d := pb.RenderArticleIndex_builder{
		List: make([]*pb.RenderArticleYear, len(yl)),
	}

	for _, y := range yl {
		src := g.article.year[y]
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
		d.List = append(d.List, dst.Build())
	}

	g.addFail(
		`article`,
		util.WriteStaticData(ArticleFileName, d.Build()),
	)
}
