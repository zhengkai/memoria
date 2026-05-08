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

func (m *Manager) LoadItem(id uint64) (re *Item) {
	if id == 0 || id > m.maxItemID {
		return nil
	}
	return m.Item[id]
}

func (m *Manager) loadItem(id uint64) (re *Item) {

	re = m.Item[id]
	if re != nil {
		return re
	}
	re = &Item{
		ID: id,
	}
	if m.maxItemID < id {
		m.maxItemID = id
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

	m.Item[id] = re
	return
}
