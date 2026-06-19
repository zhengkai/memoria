// Package pg PgSQL 包装
package pg

import (
	"project/util"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type PG struct {
	p *pgxpool.Pool
}

var p = &PG{}

var Init = p.Init
var InsertFile = p.InsertFile
var ImportFile = p.ImportFile
var SyncIDSequence = p.SyncIDSequence

var SetItem = p.SetItem
var ImportItem = p.ImportItem

func (p *PG) Query(sql string, args ...any) (pgx.Rows, error) {
	ctx, cacel := util.CTXTimeoutQuick()
	re, err := p.p.Query(ctx, sql, args...)
	cacel()
	return re, err
}
