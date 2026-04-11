package db

import (
	"crypto/sha256"
	"errors"
	"project/zj"

	"github.com/go-sql-driver/mysql"
	"google.golang.org/protobuf/proto"
)

func SaveBin(m proto.Message) (id uint64, err error) {

	defer zj.Watch(&err)

	ab, err := proto.Marshal(m)
	if err != nil {
		return
	}

	hash := sha256.Sum256(ab)
	query := `INSERT INTO bin SET hash = ?, bin = ?`
	r, err := d.Exec(query, hash[:], ab)
	if err != nil {
		var me *mysql.MySQLError
		if errors.As(err, &me) && me.Number == 1062 {
			// hash 冲突则取出已有 id
			query := `SELECT content FROM bin WHERE hash = ?`
			row := d.QueryRow(query, hash[:])
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

func LoadBin(id uint64, m proto.Message) (hash [32]byte, err error) {

	defer zj.Watch(&err)

	var bin []byte
	var ab []byte

	query := `SELECT hash, content FROM bin WHERE bin_id = ?`
	row := d.QueryRow(query, id)
	err = row.Scan(&ab, &bin)
	if err != nil {
		return
	}

	hash = [32]byte(ab)
	err = proto.Unmarshal(bin, m)
	return
}
