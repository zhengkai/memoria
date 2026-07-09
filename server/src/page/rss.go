package page

import (
	"project/export"
	"project/pb"
	"project/util"
	"project/zj"
	"text/template"

	_ "embed"
)

//go:embed tpl/atom.xml
var rssXML string

const feedSize = 20

type RSS struct {
	Meta
	TSUpdate uint64
	Entry    []*Item
}

func TestFeed() {
	zj.J(rssXML)
}

func (m *Manager) makeRSSTpl() *template.Template {
	return template.Must(template.New(`feed`).Funcs(m.tplFunc).Parse(rssXML))
}

func (m *Manager) rssInit() error {

	index := &pb.RenderArticleIndex{}
	err := util.ReadStaticData(export.ArticleFile(`full`), index)
	if err != nil {
		zj.W(err)
		return err
	}

	d := m.fillRSS(index)

	pc := m.genPage(FileRSS, d, m.rssTpl)
	pc.Mime = MimeAtom
	pc.HeaderExpires = ExpireMiddle

	m.PageCache[`/blog/rss`] = pc

	return nil
}

func (m *Manager) fillRSS(index *pb.RenderArticleIndex) (d *RSS) {

	d = &RSS{}
	m.setMeta(`feed`, d)
	d.Canonical = `/rss`

	for _, y := range index.GetList() {
		for _, il := range y.GetList() {
			id := il.GetId()
			it := m.loadItem(id)
			meta := &it.DBMeta
			if meta.GetTsHide() > 0 {
				continue
			}
			d.Entry = append(d.Entry, it)
			d.TSUpdate = max(it.DB.GetTsCreate(), it.DB.GetTsContent(), it.DB.GetTsMeta(), d.TSUpdate)
			if len(d.Entry) >= feedSize {
				return
			}
		}
	}
	return
}
