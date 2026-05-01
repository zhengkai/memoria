// package gen 生成数据
package gen

import (
	"fmt"
	"net/http"
	"project/db"
	"project/item"
	"project/pb"
	"project/util"
	"project/zj"
	"sync"
	"time"

	"github.com/zhengkai/life-go"
	"google.golang.org/protobuf/proto"
)

var theGen = &Gen{}

func TestHandle(w http.ResponseWriter, r *http.Request) {
	if !theGen.Run() {
		w.Write([]byte(`gen locked`))
		return
	}
	w.Write([]byte(`gen start`))
}

type Gen struct {
	mux sync.Mutex
}

func (g *Gen) Run() bool {

	if !g.mux.TryLock() {
		return false
	}
	g.mux.Unlock()

	ts, err := db.GetGenTime()
	if err != nil {
		zj.W(`gen fail, no time:`, err)
		return false
	}

	ctx, cancel := life.CTXTimeout(10 * time.Minute)
	defer cancel()

	var idList = make([]uint64, 0, 1000)
	for id, err := range db.GetGenList(ctx, ts) {
		if err != nil {
			return false
		}
		idList = append(idList, id)
	}

	item.Clear()

	var li = make([]*pb.Item, len(idList))
	for idx, id := range idList {
		li[idx], err = item.Get(id)
		if err != nil {
			zj.W(`gen fail, get item:`, id, err)
			return false
		}
	}

	g.genItem(li)

	return true
}

func (g *Gen) genItem(li []*pb.Item) bool {

	for _, it := range li {

		id := it.GetId()

		pb, err := proto.Marshal(it)
		if err != nil {
			zj.W(`gen fail, marshal item:`, id, err)
			continue
		}

		file := fmt.Sprintf(`data/item/%03d/%03d.bin`, id/1000, id%1000)

		util.WriteStaticFileIfModified(file, pb)
	}

	zj.W(len(li))

	return true
}
