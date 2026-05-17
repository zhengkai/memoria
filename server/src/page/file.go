package page

import "fmt"

const (
	FileArticle = `page/article.html`
	FileHome    = `page/home.html`
	FileStyle   = `page/style.css`
	FileRSS     = `page/rss/article.xml`
)

func FileItem[T PItem | uint64](id T) string {
	return fmt.Sprintf(`page/item/%03d/%03d.html`, id/1000, id%1000)
}

func FileNote[T PNote | uint32](year T) string {
	return fmt.Sprintf(`page/note/%04d.html`, year)
}

func FileError(code int) string {
	return fmt.Sprintf(`page/error/%d.html`, code)
}
