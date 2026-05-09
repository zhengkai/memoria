package public

import (
	"io"
	"os"
	"project/config"
	"project/util"
	"project/zj"
)

func (p *public) sendFile(file string) {

	if config.UseNginx {
		// zj.J(`send file`, `/inter-`+file)
		p.w.Header().Set(`X-Accel-Redirect`, `/inter-`+file)
		return
	}

	sendFile(p.w, file)
}

func sendFile(w io.Writer, file string) {
	fh, err := os.Open(util.Static(file))
	if err != nil {
		zj.W(`open file fail:`, file, err)
		return
	}
	defer fh.Close()
	io.Copy(w, fh)
}
