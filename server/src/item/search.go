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
	searchID := s.Id
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
			if s.Keyword != `` && !strings.Contains(it.Content.Raw, s.Keyword) && !strings.Contains(it.GetMeta().GetTitle(), s.Keyword) {
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
