package api

import (
	"project/db"
	"project/item"
	"project/pb"
	"project/util"
)

func itemSet(ie *pb.ItemEdit, e *util.Error) uint64 {
	err := item.Edit(ie)
	if err != nil {
		e.Fill(err)
		return 0
	}
	return ie.GetId()
}

func itemGet(id uint64, e *util.Error) *pb.Item {
	it, err := item.Get(id)
	if err != nil {
		e.Fill(err)
		return nil
	}
	return it
}

func itemListRecent(n uint32, e *util.Error) *pb.ItemList {

	li, err := db.ListItem(0, int(n), true)
	if err != nil {
		e.Fill(err)
		return nil
	}

	re := make([]*pb.Item, len(li))

	for i, v := range li {
		it, err := item.Get(v)
		if err != nil {
			e.Fill(err)
			return nil
		}
		re[i] = it
	}

	return pb.ItemList_builder{List: re}.Build()
}

func itemSearch(s *pb.ItemSearch, e *util.Error) *pb.ItemList {
	li, err := item.Search(s)
	if err != nil {
		e.Fill(err)
		return nil
	}
	return pb.ItemList_builder{List: li}.Build()
}
