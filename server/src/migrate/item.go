package migrate

import (
	"project/db"
	"project/item"
	"project/pb"
	"project/pg"
	"project/zj"
)

func Item() {

	limit := 10

	var cursor uint64

	for {
		re, err := db.ListItem(cursor, limit, false)
		if err != nil {
			zj.W("migrate ListFile err: %v", err)
			return
		}

		for _, v := range re {
			if cursor < v {
				cursor = v
			}
			e2 := itemOne(v)
			if e2 != nil {
				zj.W(`item one`, v, e2)
				return
			}
		}

		if len(re) < limit {
			break
		}

	}
}

func itemOne(id uint64) (err error) {

	idb, err := db.LoadItem(id)
	if err != nil {
		return
	}

	d, err := item.GetItemFull(idb)
	if err != nil {
		return
	}

	r, _, err := db.LoadRevision(idb.GetRevisionId())
	if err != nil {
		return
	}

	content := pb.ItemContent_builder{
		Format: new(r.GetFormat()),
		Raw:    new(r.GetRaw()),
	}.Build()

	sm := idb.GetMeta()

	meta := pb.ItemMetaV2_builder{
		TsHide:   new(sm.GetTsHide()),
		Root:     new(sm.GetRoot()),
		Title:    new(sm.GetTitle()),
		Original: new(sm.GetOriginal()),
		Trivial:  new(sm.GetTrivial()),
	}.Build()
	if og := d.GetOg(); og != nil {
		meta.SetOg(og)
	}

	err = pg.ImportItem(id, meta, content, sm.GetTsCreate(), sm.GetTsRevise())
	zj.F(`item %d`, id)
	if err != nil {
		return
	}

	return nil
}
