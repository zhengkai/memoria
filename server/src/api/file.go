package api

import (
	"project/pb"
	"project/pg"
	"project/util"
)

func fileList(id uint64, e *util.Error) *pb.FileList {

	re, err := pg.ListFile(id, true)
	if err != nil {
		e.Fill(err)
		return nil
	}
	return re
}
