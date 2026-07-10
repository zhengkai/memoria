package pg

import (
	"project/pb"
	"project/util"
	"time"

	"github.com/jackc/pgx/v5"
)

const (
	exportTimeIDMain uint64 = iota
)

type ExportRow struct {
	Item     *pb.ItemDBv2
	TSUpdate uint64
}

func (p *PG) GetExportTime() (t time.Time, err error) {

	query := `SELECT time FROM public.export_time WHERE export_id = $1`
	ctx, cancel := util.CTXTimeoutQuick()
	err = p.p.QueryRow(ctx, query, exportTimeIDMain).Scan(&t)
	cancel()
	if err == pgx.ErrNoRows {
		err = nil
	}
	return
}

func (p *PG) SetExportTime(t time.Time) error {
	sql := `INSERT INTO export_time (export_id, time) VALUES ($1, $2) ON CONFLICT (export_id) DO UPDATE SET time = $2`
	ctx, cancel := util.CTXTimeoutQuick()
	_, err := p.p.Exec(ctx, sql, exportTimeIDMain, t)
	cancel()
	return err
}
