package item

import (
	"project/db"
	"project/pb"
	"sync"
	"time"

	"github.com/zhengkai/coral/v2"
)

var revisionPool = newRevisionPool()

type RevisionPool struct {
	cache coral.Cache[uint64, *pb.Revision]
	hash  map[[32]byte]*pb.Revision
	mux   sync.RWMutex
}

func newRevisionPool() *RevisionPool {

	rp := &RevisionPool{
		hash: make(map[[32]byte]*pb.Revision, 1000),
	}
	rp.cache = coral.NewLRU(rp.cacheLoad, 20000, 22000)
	return rp
}

func (rp *RevisionPool) Get(id uint64) (*pb.Revision, error) {
	return rp.cache.Get(id)
}

func (rp *RevisionPool) cacheLoad(id uint64) (*pb.Revision, *time.Time, error) {

	rp.mux.Lock()
	defer rp.mux.Unlock()

	r, hash, err := db.LoadRevision(id)
	if err != nil {
		return nil, nil, err
	}
	rp.hash[hash] = r

	return r, nil, nil
}
