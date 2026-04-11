package db

import (
	"errors"
	"project/pb"
	"project/util"
	"project/zj"

	"github.com/go-sql-driver/mysql"
	"google.golang.org/protobuf/proto"
)

func SaveRevision(hash []byte, ab []byte) (id uint64, err error) {

	defer zj.Watch(&err)

	query := `INSERT INTO revision SET hash = ?, bin = ?`
	r, err := d.Exec(query, hash, ab)
	if err != nil {
		var me *mysql.MySQLError
		if errors.As(err, &me) && me.Number == 1062 {
			// hash 冲突则取出已有 id
			query := `SELECT revision_id FROM revision WHERE hash = ?`
			row := d.QueryRow(query, hash)
			err = row.Scan(&id)
			if err != nil {
				return
			}
			return id, nil
		}
		return
	}

	i, err := r.LastInsertId()
	if err != nil {
		return
	}

	id = uint64(i)
	return
}

func LoadRevision(id uint64) (rev *pb.Revision, hash [32]byte, err error) {

	defer zj.Watch(&err)

	var bin []byte

	query := `SELECT bin FROM revision WHERE revision_id = ?`
	row := d.QueryRow(query, id)
	err = row.Scan(&bin)
	if err != nil {
		return
	}

	rev = &pb.Revision{}

	err = proto.Unmarshal(bin, rev)
	if err != nil {
		rev = nil
		return
	}

	return
}

func LoadRevisionIDByHash(hash [32]byte) (id uint64, err error) {

	defer zj.Watch(&err)

	query := `SELECT revision_id, bin FROM revision WHERE hash = ?`
	row := d.QueryRow(query, hash)
	err = row.Scan(&id)
	if err != nil {
		return
	}

	return
}

func AddRevisionHistory(itemID, revisionID uint64) error {
	query := `INSERT INTO edit_history SET item_id = ?, revision_id = ?, ts_create = ?`
	_, err := d.Exec(query, itemID, revisionID, util.Now())
	return err
}
