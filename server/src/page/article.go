package page

import (
	"project/export"
	"project/pb"
	"project/util"
	"project/zj"
)

type ArticleIndex struct {
	Meta
	Content *pb.RenderArticleIndex
}

type ArticleSingle struct {
	Meta
	Content *Item
}

func (m *Manager) articleInit() {

	index := &pb.RenderArticleIndex{}

	err := util.ReadStaticData(export.ArticleFileName, index)
	if err != nil {
		zj.W(err)
		return
	}

	for _, y := range index.GetList() {
		for _, il := range y.GetList() {

			id := il.GetId()
			file := FileItem(id)

			d := m.loadItem(id)
			m.setMeta(`item`, d)
			d.Canonical = LinkItem(id)

			m.genPage(file, d, m.articleSingleTpl)
		}
	}

	d := &ArticleIndex{
		Content: index,
	}
	m.setMeta(`article`, d)
	d.Canonical = LinkArticle

	m.genPage(FileArticle, d, m.articleIndexTpl)
}
