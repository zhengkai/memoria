package item

import (
	"project/db"
	"project/pb"
	"project/util"
	"project/zj"
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

	rid, err := revisionPool.Save(ie.GetContent())
	if err != nil {
		return err
	}

	meta := n.GetMeta()

	// ts_create
	if ie.GetTsCreate() > 0 {
		meta.SetTsCreate(ie.GetTsCreate())
	}

	// ts_revise
	if raw.GetRevisionId() != rid {
		n.SetRevisionId(rid)
		meta.SetTsRevise(util.Now())
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

	meta.SetTweetId(ie.GetTweetId())

	ogID, err := binPool.Save(ie.GetOg())
	if err == nil {
		n.SetOgId(ogID)
	}

	// n.SetOg(ie.GetOg())
	n.GetMeta().SetTweetId(ie.GetTweetId())

	if proto.Equal(n, raw) {
		zj.J(`item no change`, raw.GetId(), rid)
		return nil
	}

	err = db.SaveItem(n)
	if err != nil {
		return err
	}

	zj.J(`rid`, raw.GetRevisionId(), rid)
	if raw.GetRevisionId() != rid {
		db.AddRevisionHistory(ie.GetId(), rid)
	}
	proto.Reset(raw)
	proto.Merge(raw, n)

	return nil
}

func newItem(ie *pb.ItemEdit) error {

	rid, err := revisionPool.Save(ie.GetContent())
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
	if err != nil {
		return err
	}
	ie.SetId(id)
	return err
}
