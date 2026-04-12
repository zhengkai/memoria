package db

import (
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
