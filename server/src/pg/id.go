package pg

import (
	"fmt"
	"project/util"
)

func (p *PG) SyncIDSequence(table, column string) error {

	sql := fmt.Sprintf(`SELECT setval(
		pg_get_serial_sequence('public.%s', '%s'),
		(SELECT MAX(%s) FROM public.%s)
	);`, table, column, column, table)

	ctx, cancel := util.CTXTimeoutQuick()
	_, err := p.p.Query(ctx, sql)
	cancel()
	return err
}
