package item

import (
	"project/db"
	"project/pb"
	"project/zj"
)

func Search(s *pb.ItemSearch) ([]*pb.Item, error) {

	zj.J(s)

	target := 100

	var re []*pb.Item
	var li []uint64
	var err error
	var it *pb.Item
	searchID := s.Id
	for {
		limit := target - len(re)
		li, err = db.ListItem(int(searchID), limit, true)
		if err != nil {
			zj.W(err)
			return nil, err
		}

		zj.J(`li`, searchID, len(li))

		var id uint64
		for _, id = range li {
			it, err = Get(id)
			if err != nil {
				zj.W(err)
				return nil, err
			}
			if s.Og != pb.ItemSearch_NONE && (s.Og == pb.ItemSearch_HAVE) != (it.Og != nil) {
				continue
			}
			if s.Title != pb.ItemSearch_NONE && (s.Title == pb.ItemSearch_HAVE) != (it.GetMeta().GetTitle() != ``) {
				continue
			}
			if s.Original != pb.ItemSearch_NONE && (s.Original == pb.ItemSearch_HAVE) != it.GetMeta().GetOriginal() {
				continue
			}
			if s.Trivial != pb.ItemSearch_NONE && (s.Trivial == pb.ItemSearch_HAVE) != it.GetMeta().GetTrivial() {
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
		// TODO
		if len(re) > 0 {
			break
		}
		if searchID == 0 || searchID > id {
			searchID = id
		}
	}
	zj.J(`re`, len(re))

	return re, nil
}
