package render

// doc: https://pkg.go.dev/github.com/alecthomas/chroma/v2

import (
	"bytes"
	"html"
	"project/util"
	"project/zj"
	"regexp"

	"github.com/alecthomas/chroma/v2"
	chromahtml "github.com/alecthomas/chroma/v2/formatters/html"
	"github.com/alecthomas/chroma/v2/lexers"
	"github.com/alecthomas/chroma/v2/styles"
)

var (
	reSearchPre = regexp.MustCompile(`(?s)<pre><code class="language-(\w+)">(.*?)</code></pre>`)
	reDelBrace  = regexp.MustCompile(`/\*\s*PreWrapper\s*\*/\s*\{\s*([^}]*)\s+\}`)

	cssFile = `page/highlight.css`
)

func Highlight(htmlContent []byte) []byte {

	// 匹配 <pre><code class="language-xxx">...</code></pre>

	return reSearchPre.ReplaceAllFunc(htmlContent, highlight)
}

func highlight(match []byte) []byte {
	submatches := reSearchPre.FindSubmatch(match)
	if len(submatches) < 3 {
		return match
	}

	lang := string(submatches[1])
	code := html.UnescapeString(string(submatches[2]))

	lexer := lexers.Get(lang)
	if lexer == nil {
		lexer = lexers.Fallback
	}
	lexer = chroma.Coalesce(lexer)

	formatter := chromahtml.New(
		chromahtml.WithClasses(true),
		chromahtml.PreventSurroundingPre(true),
	)
	style := styles.Get(`github`)
	transCSS(formatter, style)

	iterator, err := lexer.Tokenise(nil, code)
	if err != nil {
		return match
	}

	var buf bytes.Buffer
	buf.WriteString(`<pre><code>`)
	err = formatter.Format(&buf, style, iterator)
	buf.WriteString(`</code></pre>`)
	if err != nil {
		return match
	}

	return buf.Bytes()
}

func transCSS(formatter *chromahtml.Formatter, style *chroma.Style) {

	if util.StaticExists(cssFile) {
		// return
	}
	var cssBuf bytes.Buffer
	formatter.WriteCSS(&cssBuf, style)
	out := cssBuf.Bytes()
	out = bytes.ReplaceAll(out, []byte(`.chroma `), nil)
	out = bytes.ReplaceAll(out, []byte(` -webkit-text-size-adjust: none;`), nil)
	out = bytes.ReplaceAll(out, []byte(` -webkit-user-select: none;`), nil)

	out = reDelBrace.ReplaceAll(out, []byte("$1"))

	err := util.WriteStaticBin(cssFile,
		[]byte("pre > code {\n"),
		out,
		[]byte("}"),
	)
	zj.J(`write css file:`, cssFile, err)

}
