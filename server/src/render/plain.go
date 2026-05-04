package render

import (
	"bytes"
	"html"
	"regexp"
	"strings"
)

var br = []byte{'\n'}

var reSpaceTail = regexp.MustCompile(`[ \t]+\n`)
var reMultiBr = regexp.MustCompile(`\n{2,}`)

func Plain(content string) ([]byte, error) {

	content = strings.TrimSpace(content)

	var ab []byte

	if strings.Contains(content, "\n") {

		// 1. 删除所有行尾空白（\n 前的空白字符）
		content = reSpaceTail.ReplaceAllString(content, "\n")

		// 转义 html 特殊字符
		content = html.EscapeString(content)
		ab = []byte(content)

		// 2. 连续 2 个或更多 \n 替换为 </p><p>
		ab = reMultiBr.ReplaceAll(ab, []byte("</p><p>"))

		// 3. 单个 \n 替换为 <br>
		ab = bytes.ReplaceAll(ab, br, []byte("<br>"))

	} else {
		ab = []byte(html.EscapeString(content))
	}

	// 4. 首尾加 <p> 和 </p>
	result := make([]byte, 0, len(ab)+7)
	result = append(result, "<p>"...)
	result = append(result, ab...)
	result = append(result, "</p>"...)

	return result, nil
}
