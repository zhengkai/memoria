// Package gen 生成数据
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

	itemUpdate []*pb.ItemDB
	itemFull   []*pb.ItemDB

	// g.article, g.note 记录对应的全部数据
	article *ByYear
	note    *ByYear

	// hasArticle, hasNote 决定更新哪部分
	hasArticle bool
	hasNote    map[uint32]bool
}

func (g *Gen) init() {

	g.note = NewByYear()
	g.article = NewByYear()
	g.hasNote = make(map[uint32]bool)
}

func (g *Gen) Run() bool {

	if !g.mux.TryLock() {
		return false
	}
	g.mux.Unlock()

	g.init()

	ts, err := db.GetGenTime()
	if err != nil {
		zj.W(`gen fail, no time:`, err)
		return false
	}
	g.fetchData(ts)

	g.doGen()

	return true
}

func (g *Gen) fetchData(ts uint64) bool {

	ctx, cancel := life.CTXTimeout(10 * time.Minute)
	defer cancel()
	for row, err := range db.GetAllItemDB(ctx) {
		if err != nil {
			zj.W(`db.GetAllItemDB fail:`, err)
			return false
		}
		g.itemFull = append(g.itemFull, row.Item)

		year := GetYear(row.Item)
		isNote := row.Item.GetMeta().GetTitle() == ``
		if row.TsUpdate >= ts {
			if isNote {
				g.hasNote[year] = true
			} else {
				g.hasArticle = true
			}
			g.itemUpdate = append(g.itemUpdate, row.Item)
		}
		if isNote {
			g.article.Add(year, row.Item)
		} else {
			g.note.Add(year, row.Item)
		}
	}

	return true
}

func (g *Gen) doGen() {

	g.genItem()

	for year := range g.hasNote {
		g.genNote(year)
	}

	if g.hasArticle {
		g.genArticle()
	}
}

func (g *Gen) genItem() bool {

	for _, d := range g.itemUpdate {
		it, err := item.GetItemFull(d)
		if err != nil {
			zj.W(`gen item fail:`, err)
			continue
		}

		id := it.GetId()
		file := fmt.Sprintf(`data/item/%03d/%03d.bin`, id/1000, id%1000)
		util.WriteStaticData(file, it)
	}

	return true
}
