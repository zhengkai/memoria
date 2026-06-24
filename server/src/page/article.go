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
	Role    string
}

type ArticleSingle struct {
	Meta
	Content *Item
}

func (m *Manager) articleInit() {
	m.articleList(`article`, `闲言`, PArticle{})
	m.articleList(`curated`, `拾遗`, PCurated{})
	m.articleList(`trash`, `删余`, PTrash{})
}

func (m *Manager) articleList(name, title string, p Provider) {

	da := &pb.RenderArticleIndex{}

	err := util.ReadStaticData(export.ArticleFile(name), da)
	if err != nil {
		zj.W(err)
		return
	}

	for _, y := range da.GetList() {
		for _, il := range y.GetList() {

			id := il.GetId()
			file := FileItem(id)

			d := m.loadItem(id)
			m.setMeta(`item`, d)

			meta := &d.DBMeta
			if meta.GetTsHide() == 0 {
				if meta.GetOriginal() {
					d.AddClass(`article-original`)
					d.NavArticle = m.config.GetPathPrefix() + LinkItemInIndex(PArticle{}, id)
				} else {
					d.AddClass(`article-curated`)
					d.NavCurated = m.config.GetPathPrefix() + LinkItemInIndex(PCurated{}, id)
				}
			}

			d.Title = meta.GetTitle()
			d.Canonical = LinkItem(id)

			m.genPage(file, d, m.articleSingleTpl)
		}
	}

	d := &ArticleIndex{
		Content: da,
	}
	m.setMeta(`article`, d)
	if name == `article` {
		d.AddClass(`article-original`)
		d.Role = `original`
	} else if name == `curated` {
		d.AddClass(`article-curated`)
	}

	d.Title = title
	d.Canonical = p.Link()

	m.genPage(p.File(), d, m.articleIndexTpl)
}
