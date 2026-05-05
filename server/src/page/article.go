package page

import (
	"fmt"
	"project/export"
	"project/pb"
	"project/util"
	"project/zj"
)

var articleIndexTpl = makeTpl(`article-index`)
var ArticleIndexFile = `page/article.html`
var articleSingleTpl = makeTpl(`article`)

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
			d := p.loadItem(id)

			meta := genMeta(`item`)
			meta.Canonical = fmt.Sprintf(`/item/%03d.html`, id)
			d.Meta = meta

			err = execTplToFile(ArticleSingleFile(id), articleSingleTpl, d)
			if err != nil {
				zj.W(`write article fail:`, id, err)
			}
		}
	}

	meta := genMeta(`article`)
	meta.Canonical = `/article.html`
	d := &ArticleIndex{
		Meta:    meta,
		Content: index,
	}

	err = execTplToFile(ArticleIndexFile, articleIndexTpl, d)
	if err != nil {
		zj.W(`write article fail:`, err)
	}
	return err
}
