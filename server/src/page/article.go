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

func articleSingleFile(id uint64) string {
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
			it := p.loadItem(id)
			err = execTplToFile(articleSingleFile(id), articleSingleTpl, it)
			if err != nil {
				zj.W(`write article fail:`, id, err)
			}
		}
	}

	err = execTplToFile(ArticleIndexFile, articleIndexTpl, index)
	if err != nil {
		zj.W(`write article fail:`, err)
	}
	return err
}
