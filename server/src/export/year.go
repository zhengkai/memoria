package export

import (
	"project/pb"
	"time"
)

type ByYear struct {
	needRefresh bool
	year        map[uint32][]*pb.ItemDBv2
}

func NewByYear() *ByYear {
	return &ByYear{
		year: make(map[uint32][]*pb.ItemDBv2),
	}
}

func (y *ByYear) Add(year uint32, it *pb.ItemDBv2) {
	m, ok := y.year[year]
	if !ok {
		m = make([]*pb.ItemDBv2, 0, 100)
	}
	y.year[year] = append(m, it)
}

func GetYear(it *pb.ItemDBv2) uint32 {
	ts := it.GetTsCreate()
	t := time.UnixMilli(int64(ts))
	return uint32(t.Year())
}
