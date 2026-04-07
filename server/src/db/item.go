package db

import (
	"project/pb"
	"project/zj"

	"google.golang.org/protobuf/proto"
)

func SaveItem(item *pb.ItemDB) (err error) {

	defer zj.Watch(&err)

	id := item.ID

	v := proto.Clone(item).(*pb.ItemDB)
	v.ID = 0

	ab, err := proto.Marshal(v)
	if err != nil {
		return
	}

	// query := `INSERT INTO item SET item_id = ?, bin = ?`
	query := `UPDATE item SET bin = ? WHERE item_id = ?`
	_, err = d.Exec(query, ab, id)
	if err != nil {
		return
	}

	return
}

func LoadItem(id uint64) (item *pb.ItemDB, err error) {

	defer zj.Watch(&err)

	query := `SELECT bin FROM item WHERE item_id = ?`
	row := d.QueryRow(query, id)

	var ab []byte
	err = row.Scan(&ab)
	if err != nil {
		return
	}

	item = &pb.ItemDB{}
	err = proto.Unmarshal(ab, item)
	if err != nil {
		return
	}

	item.ID = id

	return
}
