package db

func ListItem(limit int) ([]uint64, error) {

	query := `SELECT item_id FROM item WHERE project_id = 1 ORDER BY item_id DESC LIMIT ?`
	rows, err := d.Query(query, limit)
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
