package api

import (
	"project/db"
	"project/item"
	"project/pb"
)

func itemEdit(_ *pb.ItemEdit) (rsp bool, ae *pb.APIError) {
	return true, nil
}

func itemListRecent(n uint32) (*pb.ItemList, *pb.APIError) {

	li, err := db.ListItem(int(n))
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
