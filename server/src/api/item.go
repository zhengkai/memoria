package api

import (
	"project/db"
	"project/item"
	"project/pb"
	"project/zj"
)

func itemSet(ie *pb.ItemEdit, e IError) uint64 {
	err := item.Edit(ie)
	if err != nil {
		zj.W(`item edit fail`, ie.GetId(), err.Error())
		e.SetDB()
		return 0
	}
	return ie.GetId()
}

func itemGet(id uint32, e IError) *pb.Item {
	it, err := item.Get(uint64(id))
	if err != nil {
		return nil
	}
	return it
}

func itemListRecent(n uint32, e IError) *pb.ItemList {

	li, err := db.ListItem(0, int(n), true)
	if err != nil {
		e.SetDB()
		return nil
	}

	re := make([]*pb.Item, len(li))

	for i, v := range li {
		it, err := item.Get(v)
		if err != nil {
			e.SetDB()
			return nil
		}
		re[i] = it
	}

	return pb.ItemList_builder{List: re}.Build()
}

func itemSearch(s *pb.ItemSearch, e IError) *pb.ItemList {
	li, err := item.Search(s)
	if err != nil {
		e.SetDB()
		return nil
	}
	return pb.ItemList_builder{List: li}.Build()
}
