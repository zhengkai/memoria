// Package export 生成数据
package export

import (
	"net/http"
	"project/db"
	"project/pb"
	"project/util"
	"project/zj"
	"strings"
	"sync"
	"time"

	"github.com/zhengkai/life-go"
)

var mux sync.Mutex

const Tolerance uint64 = 600 * 1000

func TestHandle(w http.ResponseWriter, r *http.Request) {

	isFull := strings.HasSuffix(r.URL.RawQuery, `full`)

	if Run(isFull) {
		w.Write([]byte(`export start`))
		return
	}
	w.Write([]byte(`export locked`))
}

func Run(isFull bool) bool {

	if !mux.TryLock() {
		return false
	}
	go func() {
		t := util.BenchStart()
		zj.IO(`export start`)
		g := Export{
			isFull: isFull,
		}
		g.run()
		zj.IO(`export end`, t.ElapsedMS())
		mux.Unlock()
	}()
	return true
}

type ExportFail struct {
	Name  string
	Error error
}

type Export struct {
	isFull bool
	wg     sync.WaitGroup

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

	if g.isFull {
		ts = 0
	} else if ts > Tolerance {
		ts -= Tolerance
	}

	doItem, doFile := g.fetch(ts)

	if !doItem && !doFile {
		zj.J(`nothing for export, skip`)
	}

	if g.fail != nil {
		zj.W(`export fail:`, g.fail.Name, g.fail.Error)
		return
	}

	db.SetExportTime(now)
}

func (g *Export) fetchData(ts uint64) {

	ctx, cancel := life.CTXTimeout(10 * time.Minute)
	defer cancel()
	for row, err := range db.GetAllItemDB(ctx) {
		if err != nil {
			g.addFail(`fetch data`, err)
			return
		}

		year := GetYear(row.Item)
		isNote := row.Item.GetMeta().GetTitle() == ``
		if row.TSUpdate < ts {
			break
		}
		if isNote {
			g.hasNote[year] = true
		} else {
			g.hasArticle = true
		}
		g.item = append(g.item, row.Item)
		if isNote {
			g.note.Add(year, row.Item)
		} else {
			g.article.Add(year, row.Item)
		}
	}
}

func (g *Export) doExport() {

	g.wg.Add(2 + len(g.hasNote))

	go g.exportItem()

	for year := range g.hasNote {
		go g.exportNote(year)
	}

	if g.hasArticle {
		go g.exportArticle()
	}
}

func (g *Export) fetch(ts uint64) (doItem bool, doFile bool) {

	g.wg.Add(2)

	go func() {
		defer g.wg.Done()
		g.fetchData(ts)
		if len(g.item) == 0 {
			return
		}
		zj.J(`export item`, len(g.item))
		doItem = true
		g.doExport()
	}()

	go func() {
		defer g.wg.Done()
		fl := g.fetchFile(ts)
		if len(fl) == 0 {
			return
		}
		zj.J(`export file`, len(fl))
		doFile = true
		for _, f := range fl {
			g.exportFile(f)
		}
	}()
	g.wg.Wait()

	return
}
