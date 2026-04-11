package item

import (
	"project/db"
	"project/pb"
	"project/util"
	"time"

	"google.golang.org/protobuf/proto"
)

func Edit(ie *pb.ItemEdit) error {
	if ie.GetId() == 0 {
		return newItem(ie)
	}
	return editItem(ie)
}

func editItem(ie *pb.ItemEdit) error {

	raw, err := itemPool.GetDB(ie.GetId())
	if err != nil {
		return err
	}

	n := util.ClonePB(raw)

	rid, err := db.SaveRevision(ie.GetContent())
	if err != nil {
		return err
	}
	n.SetRevisionId(rid)

	n.GetMeta().SetTitle(ie.GetTitle())
	n.GetMeta().SetRoot(ie.GetRoot())
	if ie.GetTsCreate() > 0 {
		n.GetMeta().SetTsCreate(ie.GetTsCreate())
	}
	if ie.GetHide() {
		if n.GetMeta().GetTsHide() == 0 {
			n.GetMeta().SetTsHide(util.Now())
		}
	} else {
		if n.GetMeta().GetTsHide() > 0 {
			n.GetMeta().SetTsHide(0)
		}
	}

	n.GetMeta().SetOriginal(ie.GetOriginal())
	n.GetMeta().SetTrivial(ie.GetTrivial())
	// n.SetOg(ie.GetOg())
	n.GetMeta().SetTweetId(ie.GetTweetId())

	err = db.SaveItem(n)
	if err != nil {
		return err
	}

	proto.Reset(raw)
	proto.Merge(raw, n)

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
