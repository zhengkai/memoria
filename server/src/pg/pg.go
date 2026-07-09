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

var dp = &PG{}

var Init = dp.Init
var InsertFile = dp.InsertFile
var GetFile = dp.GetFile
var ListFile = dp.ListFile
var ImportFile = dp.ImportFile

var LoadItemDB = dp.LoadItemDB
var SetItem = dp.SetItem
var ListItem = dp.ListItem
var RecentItem = dp.RecentItem

var InsertContent = dp.InsertContent
var GetContent = dp.GetContent

var InsertMeta = dp.InsertMeta
var GetMeta = dp.GetMeta

var SyncIDSequence = dp.SyncIDSequence
var ImportItem = dp.ImportItem

var GetExportTime = dp.GetExportTime
var SetExportTime = dp.SetExportTime

func (p *PG) Query(sql string, args ...any) (pgx.Rows, error) {
	ctx, cacel := util.CTXTimeoutQuick()
	re, err := p.p.Query(ctx, sql, args...)
	cacel()
	return re, err
}
