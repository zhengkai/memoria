package export

import (
	"project/pb"
	"sort"
)

func sortItemList(li []*pb.ItemDBv2) {

	sort.Slice(li, func(i, j int) bool {

		a := li[i].GetTsCreate()
		b := li[j].GetTsCreate()

		if a == b {
			return li[j].GetId() > li[i].GetId()
		}
		return a > b
	})
}
