package page

import (
	"project/export"
	"project/pb"
	"project/util"
	"project/zj"
)

type ArticleIndex struct {
	Meta    *Meta
	Content *pb.RenderArticleIndex
}

type ArticleSingle struct {
	Meta    *Meta
	Content *Item
}

func (m *Manager) articleInit() error {

	index := &pb.RenderArticleIndex{}

	err := util.ReadStaticData(export.ArticleFileName, index)
	if err != nil {
		zj.W(err)
		return err
	}

	for _, y := range index.GetList() {
		for _, il := range y.GetList() {

			id := il.GetId()
			file := FileItem(id)

			d := m.loadItem(id)

			meta := m.genMeta(`item`)
			meta.Canonical = m.LinkItem(id)
			d.Meta = meta

			err = execTplToFile(file, m.articleSingleTpl, d)
			if err != nil {
				zj.W(`write article fail:`, id, err)
			}
		}
	}

	meta := m.genMeta(`article`)
	meta.Canonical = m.LinkArticle()
	d := &ArticleIndex{
		Meta:    meta,
		Content: index,
	}

	err = execTplToFile(FileArticle, m.articleIndexTpl, d)
	if err != nil {
		zj.W(`write article fail:`, err)
	}
	return err
}
