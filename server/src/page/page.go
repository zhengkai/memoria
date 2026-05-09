package page

type Page struct {
	File string
	Link string
	Mime string

	raw    []byte
	gzip   []byte
	brotli []byte
}
