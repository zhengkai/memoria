package item

import (
	"project/db"
	"project/pb"
	"project/zj"
	"time"
)

func Edit(ie *pb.ItemEdit) error {
	if ie.ID == 0 {
		return newItem(ie)
	}
	zj.J("item.Edit", ie)
	return nil
}

func newItem(ie *pb.ItemEdit) error {

	rid, err := db.SaveRevision(ie.Content)
	if err != nil {
		return err
	}

	meta := &pb.ItemMeta{
		TsCreate: uint64(time.Now().UnixMilli()),
		TsRevise: 0,
		TsHide:   0,
		Root:     ie.Root,
		Title:    ie.Title,
		Original: ie.Original,
		Trivial:  ie.Trivial,
		TweetID:  ie.TweetID,
	}
	if ie.Hide {
		meta.TsHide = meta.TsCreate
	}

	d := &pb.ItemDB{
		Meta:       meta,
		RevisionID: rid,
	}
	ie.ID, err = db.NewItem(d)
	return err
}
