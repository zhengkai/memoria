package db

import (
	"context"
	"database/sql"
	"project/pb"

	"google.golang.org/protobuf/proto"
)

const (
	exportTimeIDMain uint64 = iota
)

type ExportRow struct {
	Item     *pb.ItemDB
	TSUpdate uint64
}

func GetExportTime() (ts uint64, err error) {

	query := `SELECT ts FROM export_time WHERE export_id = ?`
	row := d.QueryRow(query, exportTimeIDMain)

	err = row.Scan(&ts)
	if err == sql.ErrNoRows {
		err = nil
	}
	return
}

func SetExportTime(ts uint64) error {
	query := `INSERT INTO export_time SET export_id = ?, ts = ? ON DUPLICATE KEY UPDATE ts = ?`
	_, err := d.Exec(query, exportTimeIDMain, ts, ts)
	return err
}

func GetAllItemDB(ctx context.Context) func(func(*ExportRow, error) bool) {
	return func(yield func(*ExportRow, error) bool) {
		var lastID uint64
		const limit = 1000

		for {
			re := &ExportRow{}
			rows, err := d.QueryContext(ctx,
				`SELECT item_id, ts_update, bin FROM item WHERE item_id  > ? ORDER BY item_id ASC LIMIT ?`,
				lastID, limit,
			)
			if err != nil {
				yield(nil, err)
				return
			}

			count := 0

			var id uint64
			for rows.Next() {
				var bin []byte
				if err := rows.Scan(&id, &re.TSUpdate, &bin); err != nil {
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
			lastID = id

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
