package pg

import (
	"crypto/sha256"
	"errors"
	"project/pb"
	"project/util"
	"project/zj"
	"time"

	"google.golang.org/protobuf/proto"
)

const sqlInsertRevision = `WITH ins AS (
    INSERT INTO public.revision (hash, data, time_create)
    VALUES ($1, $2, $3)
    ON CONFLICT (hash) DO NOTHING
    RETURNING revision_id
)
SELECT revision_id FROM ins
UNION ALL
SELECT revision_id FROM public.revision WHERE hash = $1
LIMIT 1`

func (p *PG) insertRevision(m proto.Message, t *time.Time) (uint64, *util.Error) {

	ab, err := proto.Marshal(m)
	if err != nil {
		return 0, util.NewError(err).SetCode(pb.Error_INTERNAL).DetailF(`marshal revision fail`)
	}

	hash := sha256.Sum256(ab)

	if t == nil {
		t = new(time.Now())
	}

	var id int64

	ctx, cancel := util.CTXTimeout()
	err = p.p.QueryRow(ctx, sqlInsertRevision, hash[:], ab, *t).Scan(&id)
	cancel()
	if err != nil {
		zj.W(sqlInsertRevision)
		zj.W(err)
		return 0, util.NewError(err).SetCode(pb.Error_DB_INSERT).DetailF(`insert revision fail`)
	}
	if id == 0 {
		return 0, util.NewError(errors.New(`insert content id is 0`)).SetCode(pb.Error_INTERNAL)
	}

	return util.Uint64(id), nil
}
