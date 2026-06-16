// Package pg PgSQL 包装
package pg

import (
	"github.com/jackc/pgx/v5/pgxpool"
)

var d *pgxpool.Pool
