package page

const (
	MimeHTML = `text/html; charset=utf-8`
	MimeCSS  = `text/css; charset=utf-8`
)

type Page struct {
	File string
	Mime string

	Raw    []byte
	Gzip   []byte
	Brotli []byte
}
