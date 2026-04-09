package db

import (
	"project/zj"

	"google.golang.org/protobuf/proto"
)

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
