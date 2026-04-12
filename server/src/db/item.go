package db

import (
	"project/pb"
	"project/util"
	"project/zj"

	"google.golang.org/protobuf/proto"
)

func NewItem(item *pb.ItemDB) (id uint64, err error) {

	defer zj.Watch(&err)

	v := util.ClonePB(item)
	v.SetId(0)

	ab, err := proto.Marshal(v)
	if err != nil {
		err = util.NewError(err).SetCode(pb.Error_INPUT).SetDetail("marshal item fail")
		return
	}

	query := `INSERT INTO item SET project_id = 1, bin = ?`
	r, err := d.Exec(query, ab)
	if err != nil {
		err = util.NewError(err).SetCode(pb.Error_DB_INSERT).SetDetail("new item fail")
		return
	}

	i, err := r.LastInsertId()
	if err != nil {
		err = util.NewError(err).SetCode(pb.Error_DB_INSERT).SetDetail("new item fail (get id)")
		return
	}

	return uint64(i), nil
}

func SaveItem(item *pb.ItemDB) (err error) {

	defer zj.Watch(&err)

	id := item.GetId()

	v := util.ClonePB(item)
	v.SetId(0)

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
		err = util.NewError(err).SetCode(pb.Error_DB_NOT_FOUND).DetailF(`select item %d fail`, id)
		return
	}

	item = &pb.ItemDB{}
	err = proto.Unmarshal(ab, item)
	if err != nil {
		err = util.NewError(err).SetCode(pb.Error_INTERNAL).DetailF(`unmarshal item %d fail`, id)
		return
	}

	item.SetId(id)
	return
}
