package item

import (
	"project/db"
	"project/pb"
	"project/util"
	"strings"
)

func Search(s *pb.ItemSearch) (re []*pb.Item, cursor uint64, effected uint64, err error) {

	target := 20

	var li []uint64
	var it *pb.Item
	searchID := s.GetId()
	var isSearch = !util.IsEmptyPB(s)
	for {
		limit := target - len(re)
		li, err = db.ListItem(int(searchID), limit, true)
		if err != nil {
			return nil, 0, effected, err
		}

		for _, cursor = range li {
			effected++
			it, err = Get(cursor)
			if err != nil {
				return nil, 0, effected, err
			}
			if isSearch && !filterItem(it, s) {
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
			cursor = 0
			break
		}
		if searchID == 0 || searchID > cursor {
			searchID = cursor
		}
	}

	return re, cursor, effected, nil
}

func filterItem(it *pb.Item, s *pb.ItemSearch) bool {
	if s.GetOg() != pb.ItemSearch_NONE && (s.GetOg() == pb.ItemSearch_HAVE) == util.IsEmptyPB(it.GetOg()) {
		return false
	}
	if s.GetTitle() != pb.ItemSearch_NONE && (s.GetTitle() == pb.ItemSearch_HAVE) == (it.GetMeta().GetTitle() == ``) {
		return false
	}
	if s.GetOriginal() != pb.ItemSearch_NONE && (s.GetOriginal() == pb.ItemSearch_HAVE) != it.GetMeta().GetOriginal() {
		return false
	}
	if s.GetTrivial() != pb.ItemSearch_NONE && (s.GetTrivial() == pb.ItemSearch_HAVE) != it.GetMeta().GetTrivial() {
		return false
	}
	if s.GetKeyword() != `` && !strings.Contains(it.GetContent().GetRaw(), s.GetKeyword()) && !strings.Contains(it.GetMeta().GetTitle(), s.GetKeyword()) {
		return false
	}
	return true
}
