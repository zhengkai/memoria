// Package export 生成数据
package export

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
		w.Write([]byte(`export start`))
		return
	}
	w.Write([]byte(`export locked`))
}

func Run() bool {

	if !mux.TryLock() {
		return false
	}
	go func() {
		zj.IO(`export start`)
		g := Export{}
		g.run()
		zj.IO(`export end`)
		mux.Unlock()
	}()
	return true
}

type ExportFail struct {
	Name  string
	Error error
}

type Export struct {
	wg sync.WaitGroup

	item []*pb.ItemDB

	// g.article, g.note 记录对应的全部数据
	article *ByYear
	note    *ByYear

	// hasArticle, hasNote 决定更新哪部分
	hasArticle bool
	hasNote    map[uint32]bool

	fail *ExportFail
}

func (g *Export) addFail(name string, err error) {
	if err == nil || g.fail != nil {
		return
	}
	g.fail = &ExportFail{
		Name:  name,
		Error: err,
	}
}

func (g *Export) init() {
	g.note = NewByYear()
	g.article = NewByYear()
	g.hasNote = make(map[uint32]bool)
}

func (g *Export) run() {

	g.init()

	now := util.Now()

	ts, err := db.GetExportTime()
	if err != nil {
		zj.W(`export fail, no time:`, err)
		return
	}

	// TODO
	ts = 0

	g.fetchData(ts)
	if len(g.item) == 0 {
		zj.J(`nothing for export, skip`)
		return
	}

	g.doExport()

	if g.fail != nil {
		zj.W(`export fail:`, g.fail.Name, g.fail.Error)
		return
	}

	db.SetExportTime(now)
}

func (g *Export) fetchData(ts uint64) bool {

	ctx, cancel := life.CTXTimeout(10 * time.Minute)
	defer cancel()
	for row, err := range db.GetAllItemDB(ctx) {
		if err != nil {
			zj.W(`db.GetAllItemDB fail:`, err)
			return false
		}

		year := GetYear(row.Item)
		isNote := row.Item.GetMeta().GetTitle() == ``
		if row.TSUpdate >= ts {
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

func (g *Export) doExport() {

	go g.exportItem()

	for year := range g.hasNote {
		go g.exportNote(year)
	}

	if g.hasArticle {
		go g.exportArticle()
	}

	g.wg.Wait()
}
