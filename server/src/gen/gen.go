// Package gen 生成数据
package gen

import (
	"net/http"
	"project/db"
	"project/pb"
	"project/util"
	"project/zj"
	"sync"
	"time"

	"github.com/zhengkai/life-go"
)

var mux sync.Mutex

func TestHandle(w http.ResponseWriter, r *http.Request) {
	if Run() {
		w.Write([]byte(`gen start`))
		return
	}
	w.Write([]byte(`gen locked`))
}

func Run() bool {

	if !mux.TryLock() {
		return false
	}
	go func() {
		zj.IO(`gen start`)
		g := Gen{}
		g.run()
		zj.IO(`gen end`)
		mux.Unlock()
	}()
	return true
}

type GenFail struct {
	Name  string
	Error error
}

type Gen struct {
	wg sync.WaitGroup

	item []*pb.ItemDB

	// g.article, g.note 记录对应的全部数据
	article *ByYear
	note    *ByYear

	// hasArticle, hasNote 决定更新哪部分
	hasArticle bool
	hasNote    map[uint32]bool

	fail *GenFail
}

func (g *Gen) addFail(name string, err error) {
	if err == nil || g.fail != nil {
		return
	}
	g.fail = &GenFail{
		Name:  name,
		Error: err,
	}
}

func (g *Gen) init() {
	g.note = NewByYear()
	g.article = NewByYear()
	g.hasNote = make(map[uint32]bool)
}

func (g *Gen) run() {

	g.init()

	now := util.Now()

	ts, err := db.GetGenTime()
	if err != nil {
		zj.W(`gen fail, no time:`, err)
		return
	}
	g.fetchData(ts)
	if len(g.item) == 0 {
		zj.J(`nothing for gen, skip`)
		return
	}

	g.doGen()

	if g.fail != nil {
		zj.W(`gen fail:`, g.fail.Name, g.fail.Error)
		return
	}

	db.SetGenTime(now)
}

func (g *Gen) fetchData(ts uint64) bool {

	ctx, cancel := life.CTXTimeout(10 * time.Minute)
	defer cancel()
	for row, err := range db.GetAllItemDB(ctx) {
		if err != nil {
			zj.W(`db.GetAllItemDB fail:`, err)
			return false
		}

		year := GetYear(row.Item)
		isNote := row.Item.GetMeta().GetTitle() == ``
		if row.TsUpdate >= ts {
			if isNote {
				g.hasNote[year] = true
			} else {
				g.hasArticle = true
			}
			g.item = append(g.item, row.Item)
		}
		if isNote {
			g.note.Add(year, row.Item)
		} else {
			g.article.Add(year, row.Item)
		}
	}

	return true
}

func (g *Gen) doGen() {

	go g.genItem()

	for year := range g.hasNote {
		go g.genNote(year)
	}

	if g.hasArticle {
		go g.genArticle()
	}

	g.wg.Wait()
}
