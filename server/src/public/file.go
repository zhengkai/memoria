package public

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"project/config"
	"project/export"
	"project/pb"
	"project/util"
	"strconv"
	"strings"
	"time"
)

func (p *public) file() {

	if p.etag != `` {
		p.w.WriteHeader(http.StatusNotModified)
		return
	}

	id := util.FirstNum(p.path)

	f := &pb.File{}
	err := util.ReadStaticData(export.FileMetaFileName(id), f)
	if err != nil {
		p.error404()
		return
	}

	if !p.isSecure {
		p.redirect(fmt.Sprintf(`/file/%d`, id))
		return
	}

	// TODO
	// Link: <https://example.com/page>; rel="canonical"

	if config.UseNginx {
		p.sendFileHeader(f)
		sid := fmt.Sprintf(`%04d`, id)
		accel := fmt.Sprintf(config.NginxAccelPath, sid[:len(sid)-2], sid[len(sid)-2:])
		p.w.Header().Set(`X-Accel-Redirect`, accel)
	} else {
		fh, err := os.Open(util.Static(export.FileFileName(id)))
		if err != nil {
			p.error500()
			return
		}
		defer fh.Close()
		p.sendFileHeader(f)
		io.Copy(p.w, fh)
	}
}

func (p *public) sendFileHeader(f *pb.File) {

	he := p.w.Header()
	he.Set(`ETag`, fmt.Sprintf(`"file-%d"`, f.GetId()))
	he.Set(`Content-Type`, f.GetMime())
	if f.GetName() != `` {
		mode := `attachment`
		if strings.HasPrefix(f.GetMime(), `image/`) || f.GetMime() == `application/pdf` {
			mode = `inline`
		}
		displayName := fmt.Sprintf(`%s; filename="%s"`, mode, f.GetName())
		he.Set(`Content-Disposition`, displayName)
	}

	p.w.Header().Set(`Content-Length`, strconv.Itoa(int(f.GetSize())))
	if f.GetTsCreate() > 0 {
		t := time.Unix(int64(f.GetTsCreate()/1000), 0)
		he.Set(`Last-Modified`, t.Format(http.TimeFormat))
	}
	p.w.Header().Add(`Cache-Control`, `max-age=31536000, immutable`)
}
