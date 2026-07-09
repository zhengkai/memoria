package pg

import (
	"crypto/sha256"
	"errors"
	"project/pb"
	"project/util"
	"time"

	"google.golang.org/protobuf/proto"
)

const (
	sqlGetRevisionByHash = `SELECT revision_id
		FROM revision
		WHERE hash = $1;`

	sqlInsertRevision = `WITH ins AS (
		    INSERT INTO public.revision (hash, data, time_create)
		    VALUES ($1, $2, $3)
		    ON CONFLICT (hash) DO NOTHING
		    RETURNING revision_id
		)
		SELECT revision_id FROM ins
		UNION ALL
		SELECT revision_id FROM public.revision WHERE hash = $1
		LIMIT 1`

	sqlGetRevision = `SELECT data FROM public.revision WHERE revision_id = $1`
)

func (p *PG) InsertContent(content *pb.ItemContent) (uint64, *util.Error) {
	return p.insertRevision(content)
}

func (p *PG) InsertMeta(meta *pb.ItemMetaV2) (uint64, *util.Error) {
	return p.insertRevision(meta)
}

func (p *PG) GetContent(id uint64) (*pb.ItemContent, *util.Error) {
	content := &pb.ItemContent{}
	e2 := p.getRevision(id, content)
	if e2 != nil {
		return nil, e2
	}
	return content, nil
}

func (p *PG) GetMeta(id uint64) (*pb.ItemMetaV2, *util.Error) {
	meta := &pb.ItemMetaV2{}
	e2 := p.getRevision(id, meta)
	if e2 != nil {
		return nil, e2
	}
	return meta, nil
}

func (p *PG) insertRevision(m proto.Message) (uint64, *util.Error) {

	ab, err := proto.Marshal(m)
	if err != nil {
		return 0, util.NewError(err).SetCode(pb.Error_INTERNAL).DetailF(`marshal revision fail`)
	}

	hash := sha256.Sum256(ab)

	var id int64

	ctx2, cancel2 := util.CTXTimeout()
	p.p.QueryRow(ctx2, sqlGetRevisionByHash, hash[:]).Scan(&id)
	cancel2()
	if id > 0 {
		return util.Uint64(id), nil
	}

	ctx, cancel := util.CTXTimeout()
	err = p.p.QueryRow(ctx, sqlInsertRevision, hash[:], ab, time.Now()).Scan(&id)
	cancel()
	if err != nil {
		return 0, util.NewError(err).SetCode(pb.Error_DB_INSERT).DetailF(`insert revision fail`)
	}
	if id == 0 {
		return 0, util.NewError(errors.New(`insert content id is 0`)).SetCode(pb.Error_INTERNAL)
	}

	return util.Uint64(id), nil
}

func (p *PG) getRevision(id uint64, m proto.Message) *util.Error {

	var ab []byte

	ctx, cancel := util.CTXTimeout()
	err := p.p.QueryRow(ctx, sqlGetRevision, id).Scan(&ab)
	cancel()
	if err != nil {
		return util.NewError(err).SetCode(pb.Error_DB_SELECT).DetailF(`get revision %d fail`, id)
	}

	err = proto.Unmarshal(ab, m)
	if err != nil {
		return util.NewError(err).SetCode(pb.Error_INTERNAL).DetailF(`unmarshal revision %d fail`, id)
	}

	return nil
}
