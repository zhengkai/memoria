package page

import (
	"fmt"
	"project/export"
	"project/pb"
	"project/util"
	"project/zj"
)

var ArticleIndexFile = `page/article.html`

type ArticleIndex struct {
	Meta    *Meta
	Content *pb.RenderArticleIndex
}

type ArticleSingle struct {
	Meta    *Meta
	Content *Item
}

func ArticleSingleFile(id uint64) string {
	return fmt.Sprintf(`page/item/%03d/%03d.html`, id/1000, id%1000)
}

func (p *Page) articleInit() error {

	index := &pb.RenderArticleIndex{}

	err := util.ReadStaticData(export.ArticleFileName, index)
	if err != nil {
		zj.W(err)
		return err
	}

	for _, y := range index.GetList() {
		for _, il := range y.GetList() {

			id := il.GetId()
			file := ArticleSingleFile(id)

			if !p.checkFastPass(ArticleIndexFile) {
				d := p.loadItem(id)

				meta := p.genMeta(`item`)
				meta.Canonical = p.LinkItem(id)
				d.Meta = meta

				err = execTplToFile(file, p.articleSingleTpl, d)
				if err != nil {
					zj.W(`write article fail:`, id, err)
				}
			}
		}
	}

	if !p.checkFastPass(ArticleIndexFile) {

		meta := p.genMeta(`article`)
		meta.Canonical = p.LinkArticle()
		d := &ArticleIndex{
			Meta:    meta,
			Content: index,
		}

		err = execTplToFile(ArticleIndexFile, p.articleIndexTpl, d)
		if err != nil {
			zj.W(`write article fail:`, err)
		}
	}
	return err
}
