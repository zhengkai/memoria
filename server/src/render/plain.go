package render

import (
	"bytes"
	"regexp"
	"strings"
)

var br = []byte{'\n'}

var reSpaceTail = regexp.MustCompile(`[ \t]+\n`)
var reMultiBr = regexp.MustCompile(`\n{2,}`)

func Plain(content string) ([]byte, error) {

	ab := []byte(strings.TrimSpace(content))

	if bytes.Contains(ab, br) {

		// 1. 删除所有行尾空白（\n 前的空白字符）
		ab = reSpaceTail.ReplaceAll(ab, br)

		// 2. 连续 2 个或更多 \n 替换为 </p><p>
		ab = reMultiBr.ReplaceAll(ab, []byte("</p><p>"))

		// 3. 单个 \n 替换为 <br>
		ab = bytes.ReplaceAll(ab, br, []byte("<br>"))
	}

	// 4. 首尾加 <p> 和 </p>
	result := make([]byte, 0, len(ab)+7)
	result = append(result, "<p>"...)
	result = append(result, ab...)
	result = append(result, "</p>"...)

	return result, nil
}
