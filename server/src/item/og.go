package item

import (
	"project/db"
	"project/pb"
	"sync"
	"time"

	"github.com/zhengkai/coral/v2"
)

var ogPool = newOgPool()

type OgPool struct {
	cache coral.Cache[uint64, *pb.OpenGraph]
	hash  map[[32]byte]*pb.OpenGraph
	mux   sync.RWMutex
}

func newOgPool() *OgPool {

	og := &OgPool{
		hash: make(map[[32]byte]*pb.OpenGraph, 1000),
	}
	og.cache = coral.NewLRU(og.cacheLoad, 20000, 22000)
	return og
}

func (og *OgPool) Get(id uint64) (*pb.OpenGraph, error) {
	if id == 0 {
		return nil, nil
	}
	return og.cache.Get(id)
}

func (og *OgPool) cacheLoad(id uint64) (*pb.OpenGraph, *time.Time, error) {

	og.mux.Lock()
	defer og.mux.Unlock()

	m := &pb.OpenGraph{}

	hash, err := db.LoadBin(id, m)
	if err != nil {
		return nil, nil, err
	}

	og.hash[hash] = m

	return m, nil, nil
}
