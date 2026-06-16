package pg

import (
	"project/config"
	"project/util"
	"project/zj"
	"strings"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"

	_ "embed"
)

//go:embed table-init.sql
var tableInitSQL string

func (p *PG) Init() error {

	// 创建池
	ctx, cancel := util.CTXTimeoutQuick()
	var err error
	p.p, err = pgxpool.New(ctx, `postgres://`+config.PgSQL)
	cancel()
	if err != nil {
		zj.W(`pgsql fail:`, err)
		return err
	}

	// 确认连接成功
	var prevErr string
	var ver string
	for {
		ctx, cancel := util.CTXTimeoutQuick()
		err = p.p.QueryRow(ctx, `SHOW server_version`).Scan(&ver)
		cancel()
		if err != nil {
			es := err.Error()
			if prevErr != es {
				prevErr = es
				zj.W(`pgsql ping fail:`, es)
			}
			time.Sleep(time.Second)
			continue
		}
		break
	}

	func() {
		ctx, cancel := util.CTXTimeout()
		_, e2 := p.p.Exec(ctx, tableInitSQL)
		cancel()
		if e2 != nil {
			zj.W(`pgsql table init fail:`, err)
		}
	}()

	// 打印地址
	addr := config.PgSQL
	if i := strings.Index(addr, `@`); i != -1 {
		addr = addr[i+1:]
	}
	zj.J(`pgsql connected:`, addr, `, version:`, ver)

	return err
}
