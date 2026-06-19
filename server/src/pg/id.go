package pg

import (
	"fmt"
	"project/util"
)

func (p *PG) SyncIDSequence(table, column string) error {

	sql := fmt.Sprintf(`SELECT setval(
		pg_get_serial_sequence('public.%s', '%s'),
		(SELECT MAX(file_id) FROM public.%s)
	);`, table, column, table)
	ctx, cancel := util.CTXTimeout()
	_, err := p.p.Query(ctx, sql)
	cancel()
	return err
}
