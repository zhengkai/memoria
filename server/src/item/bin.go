package item

import (
	"crypto/sha256"
	"project/db"
	"project/util"
	"sync"
	"time"

	"github.com/zhengkai/coral/v2"
	"google.golang.org/protobuf/proto"
)

var binPool = newBinPool()

type BinPool struct {
	cache coral.Cache[uint64, []byte]
	hash  map[[32]byte]uint64
	mux   sync.RWMutex
}

func newBinPool() *BinPool {

	rp := &BinPool{
		hash: make(map[[32]byte]uint64, 1000),
	}
	rp.cache = coral.NewLRU(rp.cacheLoad, 20000, 22000)
	return rp
}

func (bp *BinPool) Get(id uint64, m proto.Message) error {

	ab, err := bp.cache.Get(id)
	if err != nil {
		return err
	}

	return proto.Unmarshal(ab, m)
}

func (bp *BinPool) Save(m proto.Message) (uint64, error) {

	if util.IsEmptyPB(m) {
		return 0, nil
	}

	ab, err := proto.Marshal(m)
	if err != nil {
		return 0, err
	}

	hash := sha256.Sum256(ab)
	if bp.mux.TryRLock() {
		rid, ok := bp.hash[hash]
		bp.mux.RUnlock()
		if ok {
			return rid, nil
		}
	}

	id, err := db.SaveBin(hash[:], ab)
	if err != nil {
		return 0, err
	}

	go bp.saveHash(hash, id)

	return id, nil
}

func (bp *BinPool) cacheLoad(id uint64) ([]byte, *time.Time, error) {

	ab, err := db.LoadBin(id)
	if err != nil {
		return nil, nil, err
	}

	go func() {
		hash := sha256.Sum256(ab)
		bp.saveHash(hash, id)
	}()

	return ab, nil, nil
}

func (bp *BinPool) saveHash(hash [32]byte, id uint64) {
	if bp.mux.TryLock() {
		bp.hash[hash] = id
		bp.mux.Unlock()
	}
}
