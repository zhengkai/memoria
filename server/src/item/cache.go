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

func (rp *ItemPool) Get(id uint64) (*pb.Item, error) {
	d, err := rp.cache.Get(id)
	if err != nil {
		return nil, err
	}

	r, err := revisionPool.Get(d.RevisionID)
	if err != nil {
		return nil, err
	}

	it := &pb.Item{
		ID:      d.ID,
		Meta:    d.Meta,
		Content: r,
	}

	return it, nil
}

func (rp *ItemPool) cacheLoad(id uint64) (*pb.ItemDB, *time.Time, error) {

	r, err := db.LoadItem(id)
	if err != nil {
		return nil, nil, err
	}
	return r, nil, nil
}
