package migrate

import (
	"fmt"
	"project/db"
	"project/pg"
	"project/zj"
	"time"
)

func File() {
	limit := 10
	var cursor uint64
	// m := make(map[string]string, 10)

	zj.J(`migrate File start`)
	for {
		re, err := db.ListFile(cursor, limit, false)
		if err != nil {
			zj.W("migrate ListFile err: %v", err)
			return
		}
		cursor = re.GetCursor()

		for _, v := range re.GetList() {
			// m[v.GetMime()] = v.GetName()

			ext, ok := extMap[v.GetMime()]
			if !ok {
				zj.WF("migrate File ext not found, mime: %s, name: %s", v.GetMime(), v.GetName())
				return
			}

			id := v.GetId()

			fmt.Printf(`%d.%s `, id, ext)

			bin, err := db.GetFile(id)
			if err != nil {
				zj.W("migrate GetFile %d err: %v", id, err)
				return
			}

			t := time.UnixMilli(int64(v.GetTsCreate()))

			rid, e2 := pg.ImportFile(v.GetId(), v.GetName(), ext, bin, t)
			if e2 != nil {
				zj.WF(`migrate ImportFile %d: %v`, rid, e2)
				return
			}
		}

		if len(re.GetList()) < limit {
			break
		}
	}

	pg.SyncIDSequence(`file`, `file_id`)

	zj.J(`migrate File end`)

	// for k, v := range m {
	// 	zj.J(k, v)
	// }
}
