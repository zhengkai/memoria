package api

import (
	"project/db"
	"project/item"
	"project/pb"
)

func itemSet(_ *pb.ItemEdit) (bool, *pb.APIError) {
	return true, nil
}

func itemGet(id uint32) (*pb.Item, *pb.APIError) {

	it, err := item.Get(uint64(id))
	if err != nil {
		return nil, ErrUnknown
	}

	return it, nil
}

func itemListRecent(n uint32) (*pb.ItemList, *pb.APIError) {

	li, err := db.ListItem(0, int(n), true)
	if err != nil {
		return nil, ErrDBFail
	}

	re := &pb.ItemList{
		List: make([]*pb.Item, len(li)),
	}

	for i, v := range li {
		it, err := item.Get(v)
		if err != nil {
			return nil, ErrDBFail
		}
		re.List[i] = it
	}

	return re, nil
}

func itemSearch(s *pb.ItemSearch) (*pb.ItemList, *pb.APIError) {
	li, err := item.Search(s)
	if err != nil {
		return nil, ErrUnknown
	}
	return &pb.ItemList{List: li}, nil
}
