package render

import (
	"project/util"
	"strings"
)

func Markdown(content string) ([]byte, error) {
	return util.CmdExec(
		strings.NewReader(content),
		`cmark`,
		`--unsafe`,
	)
}
