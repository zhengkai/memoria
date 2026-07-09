package api

import (
	"io"
	"net/http"
	"path/filepath"
	"project/config"
	"project/export"
	"project/pb"
	"project/pg"
	"project/zj"
	"strings"
	"time"
)

func UploadHandle(w http.ResponseWriter, r *http.Request) {

	// life.Sleep(5)

	b := pb.UploadRsp_builder{}

	id, err := uploadHandle(w, r)
	if err == nil {
		b.Id = &id
		b.Ok = new(true)
		b.Msg = new(`上传成功`)
	} else {
		zj.W(`上传失败`, err)
		b.Ok = new(false)
		b.Msg = new(err.Error())
	}

	re := b.Build()
	ab, err := config.JSONMarshaler.Marshal(re)
	if err != nil {
		zj.W(`upload 返回 json 失败`, err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Header().Set(`Content-Type`, `application/json`)
	w.Write(ab)
}

func uploadHandle(w http.ResponseWriter, r *http.Request) (uint64, error) {

	r.ParseMultipartForm(10 << 20)

	file, h, err := r.FormFile(`file`)
	if err != nil {
		zj.W(`读取文件失败`)
		return 0, err
	}
	defer file.Close()

	ab, err := io.ReadAll(file)
	if err != nil {
		zj.W(`读取文件失败`, len(ab))
		return 0, err
	}

	mime := h.Header.Get(`Content-Type`)
	zj.J(h.Filename, mime, len(ab))

	ext := filepath.Ext(h.Filename)
	ext = strings.TrimLeft(ext, `.`)

	id, dbe := pg.InsertFile(h.Filename, ext, ab)
	if dbe != nil {
		zj.W(`pg.InsertFile fail:`, dbe.Original)
		return 0, dbe
	}

	go func() {
		pg.SetExportTime(time.Now())
		export.Run(false)
	}()

	return id, nil
}
