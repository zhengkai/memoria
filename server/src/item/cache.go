package item

import (
	"errors"
	"project/pb"
	"project/pg"
	"time"

	"github.com/zhengkai/coral/v2"
)

var (
	ErrNotFound = errors.New(`item not found`)
	errEmpty    = errors.New(`save empty item`)
)

var itemPool = newItemPool()

type ItemPool struct {
	cache coral.Cache[uint64, *pb.ItemDBv2]
}

func newItemPool() *ItemPool {

	rp := &ItemPool{}
	rp.cache = coral.NewLRU(rp.cacheLoad, 20000, 22000)
	return rp
}

func (rp *ItemPool) GetDB(id uint64) (*pb.ItemDBv2, error) {
	d, err := rp.cache.Get(id)
	if err != nil {
		return nil, err
	}
	return d, nil
}

func (rp *ItemPool) Delete(id uint64) {
	rp.cache.Delete(id)
}

func (rp *ItemPool) Clear() {
	rp.cache.Reset()
}

func (rp *ItemPool) Get(id uint64) (*pb.ItemV2, error) {
	d, err := rp.cache.Get(id)
	if err != nil {
		return nil, err
	}

	return GetItemFull(d)
}

func (rp *ItemPool) cacheLoad(id uint64) (*pb.ItemDBv2, *time.Time, error) {

	r, err := pg.LoadItemDB(id)
	if err != nil {
		return nil, nil, err
	}
	return r, nil, nil
}
