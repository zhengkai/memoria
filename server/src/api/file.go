package api

import (
	"project/db"
	"project/pb"
	"project/util"
)

func fileList(id uint64, e *util.Error) *pb.FileList {

	re, err := db.ListFile(id, 100, true)
	if err != nil {
		e.Fill(err)
		return nil
	}
	return re
}
