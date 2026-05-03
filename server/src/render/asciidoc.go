package render

import (
	"project/util"
	"strings"
)

func ASCIIDoc(content string) ([]byte, error) {
	return util.CmdExec(
		strings.NewReader(content),
		`asciidoctor`,
		`-s`,
		`-a`, `nofooter`,
		`-a`, `showtitle=false`,
		`-`,
	)
}
