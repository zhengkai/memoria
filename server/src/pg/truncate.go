package pg

import (
	"fmt"
	"project/util"
	"project/zj"
)

func (p *PG) TRUNCATE(table string) {
	sql := fmt.Sprintf(`TRUNCATE TABLE %s RESTART IDENTITY CASCADE;`, table)
	zj.W(sql)
	ctx, cancel := util.CTXTimeoutQuick()
	_, err := p.p.Exec(ctx, sql)
	cancel()
	zj.W(err)
}
