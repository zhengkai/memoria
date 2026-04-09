package db

import "database/sql"

func ListItem(startID int, limit int, orderDesc bool) ([]uint64, error) {

	var rows *sql.Rows
	var err error
	if startID > 0 {
		if orderDesc {
			rows, err = d.Query(`SELECT item_id FROM item WHERE project_id = 1 AND item_id < ? ORDER BY item_id DESC LIMIT ?`, startID, limit)
		} else {
			rows, err = d.Query(`SELECT item_id FROM item WHERE project_id = 1 AND item_id > ? ORDER BY item_id ASC LIMIT ?`, startID, limit)
		}
	} else {
		if orderDesc {
			rows, err = d.Query(`SELECT item_id FROM item WHERE project_id = 1 ORDER BY item_id DESC LIMIT ?`, limit)
		} else {
			rows, err = d.Query(`SELECT item_id FROM item WHERE project_id = 1 ORDER BY item_id ASC LIMIT ?`, limit)
		}
	}
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var li []uint64

	for rows.Next() {
		var id uint64

		err = rows.Scan(&id)
		if err != nil {
			return nil, err
		}

		li = append(li, id)
	}
	return li, nil
}
