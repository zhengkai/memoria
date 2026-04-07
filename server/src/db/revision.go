package db

import (
	"crypto/sha256"
	"project/pb"
	"project/zj"

	"google.golang.org/protobuf/proto"
)

func SaveRevision(rev *pb.Revision) (id uint64, err error) {

	defer zj.Watch(&err)

	ab, err := proto.Marshal(rev)
	if err != nil {
		return
	}

	hash := sha256.Sum256(ab)

	query := `INSERT INTO revision SET hash = ?, bin = ?`

	r, err := d.Exec(query, hash[:], ab)
	if err != nil {
		return
	}

	i, err := r.LastInsertId()
	if err != nil {
		return
	}

	id = uint64(i)
	return
}

func LoadRevision(id uint64) (rev *pb.Revision, hash [32]byte, err error) {

	defer zj.Watch(&err)

	var bin []byte

	query := `SELECT bin FROM revision WHERE revision_id = ?`
	row := d.QueryRow(query, id)
	err = row.Scan(&bin)
	if err != nil {
		return
	}

	rev = &pb.Revision{}

	err = proto.Unmarshal(bin, rev)
	if err != nil {
		rev = nil
		return
	}

	return
}

func LoadRevisionIDByHash(hash [32]byte) (id uint64, err error) {

	defer zj.Watch(&err)

	query := `SELECT revision_id, bin FROM revision WHERE hash = ?`
	row := d.QueryRow(query, hash)
	err = row.Scan(&id)
	if err != nil {
		return
	}

	return
}
