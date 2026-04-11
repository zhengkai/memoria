package item

import (
	"errors"
	"project/db"
	"project/pb"
	"time"

	"github.com/zhengkai/coral/v2"
)

var (
	ErrNotFound = errors.New(`item not found`)
	errEmpty    = errors.New(`save empty item`)
)

var itemPool = newItemPool()

type ItemPool struct {
	cache coral.Cache[uint64, *pb.ItemDB]
}

func newItemPool() *ItemPool {

	rp := &ItemPool{}
	rp.cache = coral.NewLRU(rp.cacheLoad, 20000, 22000)
	return rp
}

func (rp *ItemPool) GetDB(id uint64) (*pb.ItemDB, error) {
	d, err := rp.cache.Get(id)
	if err != nil {
		return nil, err
	}
	return d, nil
}

func (rp *ItemPool) Get(id uint64) (*pb.Item, error) {
	d, err := rp.cache.Get(id)
	if err != nil {
		return nil, err
	}

	r, err := revisionPool.Get(d.GetRevisionId())
	if err != nil {
		return nil, err
	}

	ogID := d.GetOgId()
	var og = &pb.OpenGraph{}
	if ogID > 0 {
		err := binPool.Get(ogID, og)
		if err != nil {
			return nil, err
		}
	}

	it := pb.Item_builder{
		Id:      new(d.GetId()),
		Meta:    d.GetMeta(),
		Content: r,
		Og:      og,
	}.Build()

	return it, nil
}

func (rp *ItemPool) cacheLoad(id uint64) (*pb.ItemDB, *time.Time, error) {

	r, err := db.LoadItem(id)
	if err != nil {
		return nil, nil, err
	}
	return r, nil, nil
}
