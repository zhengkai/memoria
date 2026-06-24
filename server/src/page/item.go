package page

import (
	"html/template"
	"project/export"
	"project/pb"
	"project/render"
	"project/util"
	"project/zj"
)

type Item struct {
	Meta
	ID       uint64
	DB       pb.ItemDBv2
	Content  template.HTML
	Error    error
	NoteYear uint32
	DBMeta   pb.ItemMetaV2
}

func (it *Item) directRead() error {
	file := export.ItemFile(it.ID)
	err := util.ReadStaticData(file, &it.DB)
	if err != nil {
		zj.WF(`read item %d data file %s failed: %v`, it.ID, file, err)
		it.Error = err
		return err
	}
	return nil
}

func (it *Item) loadDBMeta() error {
	mid := it.DB.GetMetaRevisionId()

	metaFile := export.RevisionFile(mid)
	err := util.ReadStaticData(metaFile, &it.DBMeta)
	if err != nil {
		zj.WF(`read item %d meta file %s failed: %v`, it.ID, metaFile, err)
		it.Error = err
		return err
	}
	return nil
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

	if re.directRead() != nil {
		return
	}

	if re.loadDBMeta() != nil {
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
