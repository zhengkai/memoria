package pg

import (
	"crypto/sha256"
	"project/pb"
	"project/util"
	"project/zj"
	"time"

	"github.com/jackc/pgx/v5"
)

const sqlInsertFile = `INSERT INTO public.file (hash, data, ext, name, ts_create)
	VALUES ($1, $2, $3, $4, $5)
	ON CONFLICT (hash) DO UPDATE SET hash = EXCLUDED.hash
	RETURNING file_id`

const sqlImportFile = `INSERT INTO public.file (file_id, hash, data, ext, name, ts_create)
	OVERRIDING SYSTEM VALUE
	VALUES ($1, $2, $3, $4, $5, $6)
	ON CONFLICT (hash) DO UPDATE SET hash = EXCLUDED.hash
	RETURNING file_id`

const sqlFileList = `SELECT file_id, name, ext, hash, ts_create, LENGTH(data) as size FROM public.file `

func (p *PG) InsertFile(name, ext string, data []byte) (uint64, *util.Error) {

	hash := sha256.Sum256(data)

	sql := `SELECT file_id FROM file WHERE hash = $1`
	var id int64
	ctx, cancel := util.CTXTimeout()
	p.p.QueryRow(ctx, sql, hash[:]).Scan(&id)
	cancel()
	if id > 0 {
		return uint64(id), nil
	}

	ctx2, cancel := util.CTXTimeout()
	err := p.p.QueryRow(ctx2, sqlInsertFile, hash[:], data, ext, name, time.Now()).Scan(&id)
	cancel()
	if err != nil {
		return 0, util.NewError(err).SetCode(pb.Error_DB_INSERT).DetailF(`insert file fail`)
	}

	return util.Uint64(id), nil
}

func (p *PG) ImportFile(id uint64, name, ext string, data []byte, t time.Time) (uint64, *util.Error) {

	hash := sha256.Sum256(data)

	var rid int64
	ctx2, cancel := util.CTXTimeout()
	err := p.p.QueryRow(ctx2, sqlImportFile, id, hash[:], data, ext, name, t).Scan(&id)
	cancel()
	if err != nil {
		zj.W(err)
		return 0, util.NewError(err).SetCode(pb.Error_DB_INSERT).DetailF(`insert file fail`)
	}

	return util.Uint64(rid), nil
}

func GetFile(id uint64) ([]byte, error) {

	var data []byte

	ctx, cancel := util.CTXTimeout()
	err := p.p.QueryRow(ctx, `SELECT data FROM public.file WHERE file_id = $1`, id).Scan(&data)
	cancel()
	zj.W(err)
	if err != nil {
		return nil, util.NewError(err).SetCode(pb.Error_DB_NOT_FOUND).DetailF(`file %d not found`, id)
	}
	return data, nil
}

func ListFile(startID uint64, limit int, orderDesc bool) (*pb.FileList, error) {

	var rows pgx.Rows
	var err error

	ctx, cacel := util.CTXTimeoutQuick()
	defer cacel()
	if startID > 0 {
		if orderDesc {
			rows, err = p.p.Query(ctx, sqlFileList+`WHERE file_id < $1 ORDER BY file_id DESC LIMIT $1`, startID, limit)
		} else {
			rows, err = p.p.Query(ctx, sqlFileList+`WHERE file_id > $1 ORDER BY file_id ASC LIMIT $1`, startID, limit)
		}
	} else {
		if orderDesc {
			rows, err = p.p.Query(ctx, sqlFileList+`ORDER BY file_id DESC LIMIT $1`, limit)
		} else {
			rows, err = p.p.Query(ctx, sqlFileList+`ORDER BY file_id ASC LIMIT $1`, limit)
		}
	}
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

		var t time.Time

		err = rows.Scan(&cursor, &f.Name, &f.Mime, &hash, &t, &f.Size)
		if err != nil {
			zj.W(err)
			return nil, util.NewError(err).SetCode(pb.Error_DB_SELECT).DetailF(`list file fail (when scan list)`)
		}
		f.Id = &cursor

		f.TsCreate = new(uint64(t.UnixMilli()))
		copy(f.Hash[:], hash[:32])

		li = append(li, f.Build())
	}

	return pb.FileList_builder{List: li, Cursor: &cursor}.Build(), nil
}

func (p *PG) SyncFileIDSequence() error {

	sql := `SELECT setval(
		pg_get_serial_sequence('public.file', 'file_id'),
		(SELECT MAX(file_id) FROM public.file)
	);`

	ctx, cancel := util.CTXTimeout()
	_, err := p.p.Query(ctx, sql)
	cancel()
	return err
}
