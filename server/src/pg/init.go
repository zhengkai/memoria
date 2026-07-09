package pg

import (
	"fmt"
	"project/config"
	"project/pb"
	"project/util"
	"project/zj"
	"strings"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
)

func (p *PG) Init() (err error) {

	// 创建池
	ctx, cancel := util.CTXTimeoutQuick()
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

	c := &pb.ItemContent{}
	_, e2 := p.InsertContent(c)
	if e2 != nil {
		err = fmt.Errorf(`revision table test fail: %v`, err)
		return err
	}

	// 打印地址
	addr := config.PgSQL
	if i := strings.Index(addr, `@`); i != -1 {
		addr = addr[i+1:]
	}
	zj.J(`pgsql connected:`, addr, `, version:`, ver)

	return err
}
