package page

import (
	"html/template"
	"project/export"
	"project/pb"
	"project/render"
	"project/util"
)

type Item struct {
	ID       uint64
	DB       pb.ItemDB
	Content  template.HTML
	Error    error
	NoteYear uint32
	Meta     *Meta
}

func (p *Page) LoadItem(id uint64) (re *Item) {
	if id == 0 || id > p.maxItemID {
		return nil
	}
	return p.Item[id]
}

func (p *Page) loadItem(id uint64) (re *Item) {

	re = p.Item[id]
	if re != nil {
		return re
	}
	re = &Item{
		ID: id,
	}
	if p.maxItemID < id {
		p.maxItemID = id
	}

	re.Error = util.ReadStaticData(export.ItemFile(id), &re.DB)
	if re.Error != nil {
		return
	}

	ab, err := render.Render(&re.DB)
	if err != nil {
		re.Error = err
		return
	}
	re.Content = template.HTML(ab)

	// TODO og

	p.Item[id] = re
	return
}
