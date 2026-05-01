package db

import (
	"context"
	"database/sql"
	"project/zj"
)

const (
	genTimeIDMain uint64 = iota
)

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

func GetGenList(ctx context.Context, ts uint64) func(func(uint64, error) bool) {
	return func(yield func(uint64, error) bool) {
		var lastID uint64 = 0
		const limit = 1000

		for {
			rows, err := d.QueryContext(ctx,
				`SELECT item_id FROM item WHERE ts_update >= ? AND item_id  > ? ORDER BY ts_update, item_id ASC LIMIT ?`,
				ts, lastID, limit,
			)
			zj.J(`query`, ts, lastID, limit)
			if err != nil {
				yield(0, err)
				return
			}

			count := 0
			for rows.Next() {
				var id uint64
				if err := rows.Scan(&id); err != nil {
					rows.Close()
					yield(0, err)
					return
				}

				lastID = id
				count++

				if !yield(id, nil) {
					rows.Close()
					return
				}
			}

			rows.Close()

			if err := rows.Err(); err != nil {
				yield(0, err)
				return
			}

			if count < limit {
				return
			}
		}
	}
}
