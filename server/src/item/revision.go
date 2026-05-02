package item

import (
	"crypto/sha256"
	"project/db"
	"project/pb"
	"project/util"
	"sync"
	"time"

	"github.com/zhengkai/coral/v2"
	"google.golang.org/protobuf/proto"
)

var revisionPool = newRevisionPool()

var RevisionGet = revisionPool.Get

type RevisionPool struct {
	cache coral.Cache[uint64, *pb.Revision]
	hash  map[[32]byte]uint64
	mux   sync.RWMutex
}

func newRevisionPool() *RevisionPool {

	rp := &RevisionPool{
		hash: make(map[[32]byte]uint64, 1000),
	}
	rp.cache = coral.NewLRU(rp.cacheLoad, 20000, 22000)
	return rp
}

func (rp *RevisionPool) Get(id uint64) (*pb.Revision, error) {
	return rp.cache.Get(id)
}

func (rp *RevisionPool) Save(rev *pb.Revision) (uint64, error) {

	if util.IsEmptyPB(rev) {
		return 0, nil
	}

	ab, err := proto.Marshal(rev)
	if err != nil {
		return 0, err
	}

	hash := sha256.Sum256(ab)
	if rp.mux.TryRLock() {
		rid, ok := rp.hash[hash]
		rp.mux.RUnlock()
		if ok {
			return rid, nil
		}
	}

	id, err := db.SaveRevision(hash, ab)
	if err != nil {
		return 0, err
	}

	go rp.saveHash(hash, id)

	return id, nil
}

func (rp *RevisionPool) cacheLoad(id uint64) (*pb.Revision, *time.Time, error) {

	r, hash, err := db.LoadRevision(id)
	if err != nil {
		return nil, nil, err
	}

	go rp.saveHash(hash, id)

	return r, nil, nil
}

func (rp *RevisionPool) saveHash(hash [32]byte, id uint64) {
	if rp.mux.TryLock() {
		rp.hash[hash] = id
		rp.mux.Unlock()
	}
}
