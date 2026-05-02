package gen

import (
	"project/pb"
	"time"
)

type ByYear struct {
	year map[uint32][]*pb.ItemDB
}

func NewByYear() *ByYear {
	return &ByYear{
		year: make(map[uint32][]*pb.ItemDB),
	}
}

func (y *ByYear) Add(year uint32, it *pb.ItemDB) {
	m, ok := y.year[year]
	if !ok {
		m = make([]*pb.ItemDB, 0, 100)
	}
	y.year[year] = append(m, it)
}

func GetYear(it *pb.ItemDB) uint32 {
	ts := it.GetMeta().GetTsCreate()
	t := time.UnixMilli(int64(ts))
	return uint32(t.Year())
}
