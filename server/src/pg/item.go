package pg

import (
	"project/pb"
	"project/util"
	"project/zj"
	"time"
)

const sqlUpdateItem = `UPDATE public.item
	SET meta_id = $2,
		content_id = $3,
		time_meta = CASE WHEN meta_id IS DISTINCT FROM $2 THEN $4 ELSE time_meta END,
		time_content = CASE WHEN content_id IS DISTINCT FROM $3 THEN $4 ELSE time_content END
	WHERE item_id = $1 AND (
        meta_id IS DISTINCT FROM $2
        OR content_id IS DISTINCT FROM $3
    )`

const sqlInsertItem = `INSERT INTO public.item
	(meta_id, content_id, time_meta, time_content, time_create)
	VALUES($1, $2, $3, $3, $3)
	RETURNING item_id`

func (p *PG) InsertContent(content *pb.ItemContent) (uint64, *util.Error) {
	return p.insertRevision(content, nil)
}

func (p *PG) InsertMeta(meta *pb.ItemMetaV2) (uint64, *util.Error) {
	return p.insertRevision(meta, nil)
}

func (p *PG) SetItem(id uint64, meta *pb.ItemMetaV2, content *pb.ItemContent) (uint64, *util.Error) {

	mid, err := p.InsertMeta(meta)
	if err != nil {
		return 0, util.NewError(err).SetCode(pb.Error_DB_INSERT).DetailF(`insert item %d meta fail`, id)
	}

	cid, err := p.InsertContent(content)
	if err != nil {
		return 0, util.NewError(err).SetCode(pb.Error_DB_INSERT).DetailF(`insert item %d content fail`, id)
	}

	if id != 0 {
		return p.updateItem(id, mid, cid)
	}

	return p.insertItem(cid, mid)
}

func (p *PG) insertItem(cid, mid uint64) (uint64, *util.Error) {

	now := time.Now()

	var id int64
	ctx, cancel := util.CTXTimeout()
	err := p.p.QueryRow(ctx, sqlInsertItem, mid, cid, now).Scan(&id)
	cancel()
	if err != nil {
		return 0, util.NewError(err).SetCode(pb.Error_DB_INSERT).DetailF(`insert item fail`)
	}
	if id < 1 {
		return 0, util.NewError(nil).SetCode(pb.Error_DB_INSERT).DetailF(`insert item fail, no error but id = %d`, id)
	}
	uid := uint64(id)
	p.itemHistory(uid, mid, cid, now)
	return uid, nil
}

func (p *PG) updateItem(id, mid, cid uint64) (uint64, *util.Error) {

	now := time.Now()

	ctx, cancel := util.CTXTimeout()
	tag, err := p.p.Exec(ctx, sqlUpdateItem, id, mid, cid, now)
	cancel()
	if err != nil {
		return 0, util.NewError(err).SetCode(pb.Error_DB_UPDATE).DetailF(`update item %d fail`, id)
	}
	if tag.RowsAffected() > 0 {
		p.itemHistory(id, mid, cid, now)
	}
	return id, nil
}

func (p *PG) itemHistory(id, mid, cid uint64, t time.Time) error {
	sql := `INSERT INTO public.edit_history (item_id, meta_id, content_id, time_create) VALUES ($1, $2, $3, $4)`
	ctx, cancel := util.CTXTimeout()
	_, err := p.p.Exec(ctx, sql, id, mid, cid, t)
	cancel()
	if err != nil {
		zj.W(err)
	}
	return err
}

func (p *PG) ImportItem(id uint64, meta *pb.ItemMetaV2, content *pb.ItemContent, tsCreate, tsRevise uint64) error {

	sql := `INSERT INTO public.item (item_id, meta_id, content_id, time_meta, time_content, time_create)
	OVERRIDING SYSTEM VALUE
	VALUES ($1, $2, $2, $3, $3, $3)`

	ctx, cancel := util.CTXTimeout()
	_, err := p.p.Exec(ctx, sql, id, 1, time.Now())
	cancel()
	if err != nil {
		zj.W(err)
		return err
	}

	_, e2 := p.SetItem(id, meta, content)
	if e2 != nil {
		zj.W(e2.Original.Error())
		return e2
	}

	tCreate := time.UnixMilli(int64(tsCreate))
	tRevise := time.UnixMilli(int64(tsRevise))
	if tsRevise == 0 {
		tRevise = tCreate
	}

	sql = `UPDATE public.item SET time_create = $2, time_meta = $3, time_content = $3 WHERE item_id = $1`
	ctx2, cancel2 := util.CTXTimeout()
	_, err = p.p.Exec(ctx2, sql, id, tCreate, tRevise)
	cancel2()
	if err != nil {
		zj.W(err)
	}
	return err
}
