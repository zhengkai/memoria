package db

import (
	"context"
	"database/sql"
	"project/pb"

	"google.golang.org/protobuf/proto"
)

const (
	genTimeIDMain uint64 = iota
)

type GenRow struct {
	Item     *pb.ItemDB
	TsUpdate uint64
}

func GetGenTime() (ts uint64, err error) {

	query := `SELECT ts FROM gen_time WHERE gen_id = ?`
	row := d.QueryRow(query, genTimeIDMain)

	err = row.Scan(&ts)
	if err != nil {
		if err == sql.ErrNoRows {
			query := `INSERT IGNORE INTO gen_time SET gen_id = ?`
			d.Exec(query, genTimeIDMain)
			return 0, nil
		}
		return 0, err
	}
	return ts, nil
}

func GetAllItemDB(ctx context.Context) func(func(*GenRow, error) bool) {
	return func(yield func(*GenRow, error) bool) {
		var lastID uint64
		var lastTS uint64
		const limit = 1000

		for {
			re := &GenRow{}
			rows, err := d.QueryContext(ctx,
				`SELECT item_id, ts_update, bin FROM item WHERE ts_update >= ? AND item_id  > ? ORDER BY ts_update, item_id ASC LIMIT ?`,
				lastTS, lastID, limit,
			)
			if err != nil {
				yield(nil, err)
				return
			}

			count := 0
			for rows.Next() {
				var id uint64
				var bin []byte
				if err := rows.Scan(&id, &re.TsUpdate, &bin); err != nil {
					rows.Close()
					yield(nil, err)
					return
				}

				re.Item = &pb.ItemDB{}
				if err := proto.Unmarshal(bin, re.Item); err != nil {
					rows.Close()
					yield(nil, err)
					return
				}

				lastID = id
				lastTS = re.TsUpdate

				count++

				if re.Item.GetMeta().GetTsHide() > 0 {
					continue
				}

				re.Item.SetId(id)
				if !yield(re, nil) {
					rows.Close()
					return
				}
			}

			rows.Close()

			if err := rows.Err(); err != nil {
				yield(nil, err)
				return
			}

			if count < limit {
				return
			}
		}
	}
}
