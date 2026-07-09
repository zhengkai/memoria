// Package export 生成数据
package export

import (
	"project/pb"
	"project/pg"
	"project/util"
	"project/zj"
	"runtime/debug"
	"strconv"
	"sync"
	"time"
)

var mux sync.Mutex

const (
	DataDir = `data-v2`

	Tolerance = 600 * time.Second

	TimeFile  = DataDir + `/export-time.txt`
	StyleFile = `page/style.css`
)

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

	// 只记录要更新的 item
	item []*pb.ItemDBv2

	// g.article, g.note 记录对应的全部数据（包括 pb.ItemDB 而不止 id）
	article     *ByYear
	curated     *ByYear
	trash       *ByYear
	articleFull *ByYear
	note        *ByYear

	// hasArticle, hasNote 决定更新哪部分
	hasArticle bool
	hasNote    map[uint32]bool

	fail *ExportFail
}

func (g *Export) addFail(name string, err error) {
	if err == nil || g.fail != nil {
		return
	}

	debug.PrintStack()

	g.fail = &ExportFail{
		Name:  name,
		Error: err,
	}
}

func (g *Export) init() {
	g.article = NewByYear()
	g.curated = NewByYear()
	g.trash = NewByYear()
	g.articleFull = NewByYear()
	g.note = NewByYear()
	g.hasNote = make(map[uint32]bool)
}

func (g *Export) run() {

	g.init()

	now := time.Now()

	t, err := pg.GetExportTime()
	zj.J(`export time`, t)
	if err != nil {
		zj.W(`export fail, no time:`, err)
		return
	}

	if g.isFull {
		t = time.Unix(0, 0)
	} else {
		t = t.Add(-Tolerance)
	}

	doItem, doFile := g.fetch(t)

	if !doItem && !doFile {
		zj.J(`nothing for export, skip`)
	}

	if g.fail != nil {
		zj.W(`export fail:`, g.fail.Name, g.fail.Error)
		return
	}

	pg.SetExportTime(now)

	util.WriteStaticBin(TimeFile, []byte(strconv.Itoa(int(now.UnixMilli()))))
}

func (g *Export) fetchData(t time.Time) {

	zj.J(`fetch data since`, t.Format(time.DateTime))

	var cursor uint64
	limit := 100

	ts := uint64(t.UnixMilli())

	for {
		// 扫全库，因为列表页有其他没更新的 item
		li, err := pg.ListItem(cursor, false)
		if err != nil {
			zj.W(`fetch data fail, cursor %d: %s`, cursor, err.Error())
			return
		}
		for _, id := range li {
			if cursor == 0 || cursor < id {
				cursor = id
			}
			if !g.fetchDataOne(id, ts) {
				return
			}
		}
		if len(li) < limit {
			break
		}
	}
}

func (g *Export) fetchDataOne(id, ts uint64) (ok bool) {

	db, err := pg.LoadItemDB(id)
	if err != nil {
		return
	}
	year := GetYear(db)
	meta, e2 := pg.GetMeta(db.GetMetaRevisionId())
	if e2 != nil {
		return
	}
	isNote := meta.GetTitle() == ``
	needRefresh := db.GetTsMeta() >= ts || db.GetTsContent() >= ts

	g.fetchDataOneRecord(year, isNote, needRefresh, db, meta)

	return true
}

func (g *Export) fetchDataOneRecord(year uint32, isNote bool, needRefresh bool, db *pb.ItemDBv2, meta *pb.ItemMetaV2) {

	// g.article, g.note 记录全部数据
	record := g.note
	if isNote {
		if needRefresh {
			zj.J(`note`, year)
			g.hasNote[year] = true
		}
	} else {
		if needRefresh {
			g.hasArticle = true
		}
		if meta.GetTsHide() > 0 {
			record = g.trash
			// zj.J(`trash`, db.GetId())
		} else if !meta.GetOriginal() {
			record = g.curated
		} else {
			record = g.article
		}
		g.articleFull.Add(year, db)
	}
	record.Add(year, db)

	if needRefresh {
		g.item = append(g.item, db)
	}
}

func (g *Export) doExport() {

	g.wg.Go(g.exportItem)

	for year := range g.hasNote {
		g.wg.Go(func() {
			g.exportNote(year)
		})
	}

	if g.hasArticle {
		g.wg.Go(g.exportArticle)
	}
}

func (g *Export) fetch(t time.Time) (doItem bool, doFile bool) {

	g.wg.Go(func() {
		g.fetchData(t)
		if len(g.item) == 0 {
			return
		}
		zj.J(`export item`, len(g.item))
		doItem = true
		g.doExport()
	})

	g.wg.Go(func() {
		fl := g.fetchFile(t)
		if len(fl) == 0 {
			return
		}

		idl := make([]uint64, len(fl))
		for i, f := range fl {
			idl[i] = f.GetId()
		}
		zj.J(`export file`, idl)
		doFile = true
		for _, f := range fl {
			g.exportFile(f)
		}
	})

	g.wg.Wait()

	return
}
