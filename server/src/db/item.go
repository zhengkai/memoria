package db

import (
	"database/sql"
	"project/pb"
	"project/util"
	"project/zj"

	"google.golang.org/protobuf/proto"
)

const queryItemList = `SELECT item_id FROM item WHERE project_id = 1 `

func NewItem(item *pb.ItemDB) (id uint64, err error) {

	defer zj.Watch(&err)

	v := util.ClonePB(item)
	v.SetId(0)

	ab, err := proto.Marshal(v)
	if err != nil {
		err = util.NewError(err).SetCode(pb.Error_INPUT).SetDetail("marshal item fail")
		return
	}

	query := `INSERT INTO item SET project_id = 1, bin = ?, ts_update = ?`
	r, err := d.Exec(query, ab, util.Now())
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

	query := `UPDATE item SET bin = ?, ts_update = ? WHERE item_id = ?`
	_, err = d.Exec(query, ab, util.Now(), id)
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

func ListItem(startID int, limit int, orderDesc bool) ([]uint64, error) {

	var rows *sql.Rows
	var err error
	if startID > 0 {
		if orderDesc {
			rows, err = d.Query(queryItemList+`AND item_id < ? ORDER BY item_id DESC LIMIT ?`, startID, limit)
		} else {
			rows, err = d.Query(queryItemList+`AND item_id > ? ORDER BY item_id ASC LIMIT ?`, startID, limit)
		}
	} else {
		if orderDesc {
			rows, err = d.Query(queryItemList+`ORDER BY item_id DESC LIMIT ?`, limit)
		} else {
			rows, err = d.Query(queryItemList+`ORDER BY item_id ASC LIMIT ?`, limit)
		}
	}
	if err != nil {
		return nil, util.NewError(err).SetCode(pb.Error_DB_SELECT).DetailF("list item fail")
	}
	defer rows.Close()

	var li []uint64

	for rows.Next() {
		var id uint64

		err = rows.Scan(&id)
		if err != nil {
			return nil, util.NewError(err).SetCode(pb.Error_DB_SELECT).DetailF("list item fail (when scan list)")
		}

		li = append(li, id)
	}
	return li, nil
}
