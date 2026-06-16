package pg

import (
	"context"
	"io"
	"project/pb"
	"project/util"
	"project/zj"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

const queryInsertFile = `INSERT INTO file (hash, bin, mime, name)
	VALUES ($1, $2, $3, $4)
	ON CONFLICT (hash) DO UPDATE SET hash = EXCLUDED.hash
	RETURNING file_id`

const queryFileList = `SELECT file_id, name, mime, hash, ts_create, LENGTH(bin) as size FROM file `

func SaveFile(ctx context.Context, conn *pgxpool.Pool, r io.Reader, mime, name string) (int64, error) {
	return 0, nil
}

func GetFile(id uint64) ([]byte, error) {

	var bin []byte

	ctx, cancel := util.CTXTimeout()
	err := d.QueryRow(ctx, `SELECT bin FROM file WHERE file_id = ?`, id).Scan(&bin)
	cancel()
	if err != nil {
		return nil, util.NewError(err).SetCode(pb.Error_DB_NOT_FOUND).DetailF(`file %d not found`, id)
	}
	return bin, nil
}

func ListFile(startID uint64, limit int, orderDesc bool) (*pb.FileList, error) {

	var rows pgx.Rows
	var err error

	ctx, cacel := util.CTXTimeoutQuick()
	if startID > 0 {
		if orderDesc {
			rows, err = d.Query(ctx, queryFileList+`WHERE file_id < ? ORDER BY file_id DESC LIMIT ?`, startID, limit)
		} else {
			rows, err = d.Query(ctx, queryFileList+`WHERE file_id > ? ORDER BY file_id ASC LIMIT ?`, startID, limit)
		}
	} else {
		if orderDesc {
			rows, err = d.Query(ctx, queryFileList+`ORDER BY file_id DESC LIMIT ?`, limit)
		} else {
			rows, err = d.Query(ctx, queryFileList+`ORDER BY file_id ASC LIMIT ?`, limit)
		}
	}
	cacel()
	if err != nil {
		zj.J(err)
		return nil, util.NewError(err).SetCode(pb.Error_DB_SELECT).DetailF(`list file fail`)
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
			return nil, util.NewError(err).SetCode(pb.Error_DB_SELECT).DetailF(`list file fail (when scan list)`)
		}
		f.Id = &cursor
		copy(f.Hash[:], hash[:32])

		li = append(li, f.Build())
	}

	return pb.FileList_builder{List: li, Cursor: &cursor}.Build(), nil
}
