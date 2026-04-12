package db

import (
	"errors"
	"project/pb"
	"project/util"
	"project/zj"

	"github.com/go-sql-driver/mysql"
)

func SaveBin(hash, ab []byte) (id uint64, err error) {

	defer zj.Watch(&err)

	query := `INSERT INTO bin SET hash = ?, content = ?`
	r, err := d.Exec(query, hash, ab)
	if err != nil {
		var me *mysql.MySQLError
		if errors.As(err, &me) && me.Number == 1062 {
			// hash 冲突则取出已有 id
			query := `SELECT bin_id FROM bin WHERE hash = ?`
			row := d.QueryRow(query, hash)
			err = row.Scan(&id)
			if err != nil {
				err = util.NewError(err).SetCode(pb.Error_DB_INSERT).DetailF("save bin fail: %x", hash[:4])
				return
			}
			return id, nil
		}
		err = util.NewError(err).SetCode(pb.Error_DB_INSERT).DetailF("save bin fail: %x", hash[:4])
		return
	}

	i, err := r.LastInsertId()
	if err != nil {
		return
	}

	id = uint64(i)
	return
}

func LoadBin(id uint64) (ab []byte, err error) {

	defer zj.Watch(&err)

	query := `SELECT hash, content FROM bin WHERE bin_id = ?`
	row := d.QueryRow(query, id)
	err = row.Scan(&ab, &ab)
	if err != nil {
		return nil, err
	}
	return ab, nil
}
