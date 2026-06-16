package pg

import (
	"project/config"
	"project/util"
	"project/zj"
	"strings"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
)

func Init() error {

	// 创建池
	ctx, cacel := util.CTXTimeoutQuick()
	var err error
	d, err = pgxpool.New(ctx, `postgres://`+config.PgSQL)
	cacel()
	if err != nil {
		zj.W(`pgsql fail:`, err)
		return err
	}

	// 确认连接成功
	var prevErr string
	var ver string
	for {
		ctx, cacel := util.CTXTimeoutQuick()
		err = d.QueryRow(ctx, `SHOW server_version`).Scan(&ver)
		cacel()
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

	// 打印地址
	addr := config.PgSQL
	if i := strings.Index(addr, `@`); i != -1 {
		addr = addr[i+1:]
	}
	zj.J(`pgsql connected:`, addr, `, version:`, ver)

	return err
}
