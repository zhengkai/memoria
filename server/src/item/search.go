package item

import (
	"project/db"
	"project/pb"
	"project/zj"
	"strings"
)

func Search(s *pb.ItemSearch) ([]*pb.Item, error) {

	zj.J(s)

	target := 20

	var re []*pb.Item
	var li []uint64
	var err error
	var it *pb.Item
	searchID := s.GetId()
	for {
		limit := target - len(re)
		li, err = db.ListItem(int(searchID), limit, true)
		if err != nil {
			zj.W(err)
			return nil, err
		}

		var id uint64
		for _, id = range li {
			it, err = Get(id)
			if err != nil {
				zj.W(err)
				return nil, err
			}
			if s.GetOg() != pb.ItemSearch_NONE && (s.GetOg() == pb.ItemSearch_HAVE) != (it.GetOg() != nil) {
				continue
			}
			if s.GetTitle() != pb.ItemSearch_NONE && (s.GetTitle() == pb.ItemSearch_HAVE) != (it.GetMeta().GetTitle() != ``) {
				continue
			}
			if s.GetOriginal() != pb.ItemSearch_NONE && (s.GetOriginal() == pb.ItemSearch_HAVE) != it.GetMeta().GetOriginal() {
				continue
			}
			if s.GetTrivial() != pb.ItemSearch_NONE && (s.GetTrivial() == pb.ItemSearch_HAVE) != it.GetMeta().GetTrivial() {
				continue
			}
			if s.GetKeyword() != `` && !strings.Contains(it.GetContent().GetRaw(), s.GetKeyword()) && !strings.Contains(it.GetMeta().GetTitle(), s.GetKeyword()) {
				continue
			}
			re = append(re, it)
			if len(re) >= limit {
				break
			}
		}
		if len(re) >= target {
			break
		}
		if len(li) < limit {
			break
		}
		if searchID == 0 || searchID > id {
			searchID = id
		}
	}

	return re, nil
}
