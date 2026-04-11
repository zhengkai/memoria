package item

import (
	"project/db"
	"project/pb"
	"project/zj"
	"time"
)

func Edit(ie *pb.ItemEdit) error {
	if ie.GetId() == 0 {
		return newItem(ie)
	}
	zj.J("item.Edit", ie)
	return nil
}

func newItem(ie *pb.ItemEdit) error {

	rid, err := db.SaveRevision(ie.GetContent())
	if err != nil {
		return err
	}

	meta := pb.ItemMeta_builder{
		TsCreate: new(uint64(time.Now().UnixMilli())),
		TsRevise: new(uint64(0)),
		TsHide:   new(uint64(0)),
		Root:     new(ie.GetRoot()),
		Title:    new(ie.GetTitle()),
		Original: new(ie.GetOriginal()),
		Trivial:  new(ie.GetTrivial()),
		TweetId:  new(ie.GetTweetId()),
	}.Build()
	if ie.GetHide() {
		meta.SetTsHide(meta.GetTsCreate())
	}

	d := pb.ItemDB_builder{
		Meta:       meta,
		RevisionId: &rid,
	}.Build()
	id, err := db.NewItem(d)
	ie.SetId(id)
	return err
}
