package gen

import (
	"project/pb"
	"sort"
)

func sortItemList(li []*pb.ItemDB) {

	sort.Slice(li, func(i, j int) bool {

		a := li[i].GetMeta().GetTsCreate()
		b := li[j].GetMeta().GetTsCreate()

		if a == b {
			return li[j].GetId() > li[i].GetId()
		}
		return a > b
	})
}
