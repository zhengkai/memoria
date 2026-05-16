package db

import (
	"crypto/sha256"
	"database/sql"
	"project/pb"
	"project/util"
	"project/zj"
)

const queryFileList = `SELECT file_id, name, mime, hash, ts_create, LENGTH(bin) as size FROM file `

func ListFile(startID uint64, limit int, orderDesc bool) (*pb.FileList, error) {

	var rows *sql.Rows
	var err error
	if startID > 0 {
		if orderDesc {
			rows, err = d.Query(queryFileList+`WHERE file_id < ? ORDER BY file_id DESC LIMIT ?`, startID, limit)
		} else {
			rows, err = d.Query(queryFileList+`WHERE file_id > ? ORDER BY file_id ASC LIMIT ?`, startID, limit)
		}
	} else {
		if orderDesc {
			rows, err = d.Query(queryFileList+`ORDER BY file_id DESC LIMIT ?`, limit)
		} else {
			rows, err = d.Query(queryFileList+`ORDER BY file_id ASC LIMIT ?`, limit)
		}
	}
	if err != nil {
		zj.J(err)
		return nil, util.NewError(err).SetCode(pb.Error_DB_SELECT).DetailF("list file fail")
	}
	defer rows.Close()

	var li []*pb.File
	var cursor uint64
	for rows.Next() {

		f := &pb.File_builder{}

		var hash []byte

		err = rows.Scan(&cursor, &f.Name, &f.Mime, &hash, &f.TsCreate, &f.Size)
		if err != nil {
			zj.W(err)
			return nil, util.NewError(err).SetCode(pb.Error_DB_SELECT).DetailF("list file fail (when scan list)")
		}
		f.Id = &cursor
		copy(f.Hash[:], hash[:32])

		li = append(li, f.Build())
	}

	return pb.FileList_builder{List: li, Cursor: &cursor}.Build(), nil
}

func GetFile(id uint64) ([]byte, error) {
	var bin []byte
	err := d.QueryRow(`SELECT bin FROM file WHERE file_id = ?`, id).Scan(&bin)
	if err != nil {
		return nil, util.NewError(err).SetCode(pb.Error_DB_NOT_FOUND).DetailF(`file %d not found`, id)
	}
	return bin, nil
}

// file_id hash bin mime name w h is_retina ts_create

func InsertFile(name, mime string, bin []byte) (uint64, *util.Error) {

	hash := sha256.Sum256(bin)

	query := `SELECT file_id FROM file WHERE hash = ?`
	var id uint64
	d.QueryRow(query, hash[:]).Scan(&id)
	if id > 0 {
		return id, nil
	}

	query = `INSERT INTO file (hash, bin, mime, name, ts_create) VALUES (?, ?, ?, ?, ?)`
	res, err := d.Exec(query, hash[:], bin, mime, name, util.Now())
	if err != nil {
		return 0, util.NewError(err).SetCode(pb.Error_DB_INSERT).DetailF("insert file fail, %s", name)
	}
	isnertID, err := res.LastInsertId()
	if err != nil {
		return 0, util.NewError(err).SetCode(pb.Error_DB_INSERT).DetailF("insert file fail, %s", name)
	}
	return uint64(isnertID), nil
}
