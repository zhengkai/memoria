package page

import (
	"crypto/sha256"
	"encoding/binary"
	"fmt"
	"project/export"
	"project/util"
)

func (m *Manager) getStyleLink() string {

	var h []byte

	ab, err := util.ReadStaticBin(export.StyleFile)
	if err == nil {
		hash := sha256.Sum256(ab)
		h = hash[:4]
	} else {
		b := make([]byte, 8)
		binary.LittleEndian.PutUint64(b, util.Now()/1000)
		h = b
	}

	return m.linkPath(fmt.Sprintf(`/style-%x.css`, h[:4]))
}
