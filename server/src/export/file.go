package export

import (
	"fmt"
	"project/pb"
	"project/pg"
	"project/util"
	"project/zj"
	"time"
)

func FileFileName(id uint64) string {
	return fmt.Sprintf(`file/%03d/%03d.bin`, id/1000, id%1000)
}

func FileMetaFileName(id uint64) string {
	return fmt.Sprintf(`file/%03d/%03d.pb`, id/1000, id%1000)
}

func (g *Export) fetchFile(t time.Time) (fl []*pb.File) {

	ts := uint64(t.UnixMilli())

	var cursor uint64
	limit := 100

	for {
		df, err := pg.ListFile(cursor, limit, true)
		if err != nil {
			break
		}
		cursor = df.GetCursor()

		for _, f := range df.GetList() {
			if f.GetTsCreate() < ts {
				break
			}
			fl = append(fl, f)
		}

		if len(df.GetList()) < limit {
			break
		}
	}

	return fl
}

func (g *Export) exportFile(f *pb.File) {

	id := f.GetId()

	file := FileFileName(id)
	metaFile := FileMetaFileName(id)
	if !util.StaticExists(metaFile) {
		if err := util.WriteStaticData(metaFile, f); err != nil {
			zj.J(`write file meta fail:`, id, err)
			return
		}
	}
	if !util.StaticExists(file) {
		ab, err := pg.GetFile(id)
		zj.J(`export file:`, id)
		if err != nil {
			zj.W(err)
			return
		}
		if err := util.WriteStaticBin(file, ab); err != nil {
			zj.J(`write file bin fail:`, id, err)
			return
		}
	}
}
