package item

import (
	"project/pb"
	"project/pg"
	"project/util"
)

var ErrItemContentEmpty = &util.Error{
	Code:    pb.Error_INPUT_MISSING,
	Message: `item content empty`,
}

func Edit(ie *pb.ItemEdit) error {
	if util.IsEmptyPB(ie.GetContent()) {
		return ErrItemContentEmpty
	}
	if ie.GetId() == 0 {
		return newItem(ie)
	}
	return editItem(ie)
}

func editItem(ie *pb.ItemEdit) error {

	id := ie.GetId()

	raw, err := itemPool.GetDB(id)
	if err != nil {
		return err
	}

	meta, e2 := pg.GetMeta(raw.GetMetaRevisionId())
	if e2 != nil {
		return e2
	}

	// ts_hide
	if ie.GetHide() {
		if meta.GetTsHide() == 0 {
			meta.SetTsHide(util.Now())
		}
	} else {
		if meta.GetTsHide() > 0 {
			meta.SetTsHide(0)
		}
	}

	meta.SetRoot(ie.GetRoot())
	meta.SetTitle(ie.GetTitle())

	meta.SetOriginal(ie.GetOriginal())
	meta.SetTrivial(ie.GetTrivial())

	meta.SetOg(ie.GetOg())

	_, e2 = pg.SetItem(id, meta, ie.GetContent())
	if e2 != nil {
		return err
	}

	itemPool.Delete(id)

	return nil
}

func newItem(ie *pb.ItemEdit) error {

	meta := pb.ItemMetaV2_builder{
		TsHide:   new(uint64(0)),
		Root:     new(ie.GetRoot()),
		Title:    new(ie.GetTitle()),
		Original: new(ie.GetOriginal()),
		Trivial:  new(ie.GetTrivial()),
		Og:       ie.GetOg(),
	}.Build()
	if ie.GetHide() {
		meta.SetTsHide(util.Now())
	}

	content := ie.GetContent()

	id, e2 := pg.SetItem(0, meta, content)
	if e2 != nil {
		return e2
	}

	ie.SetId(id)
	return nil
}
