package page

import "fmt"

const (
	ArticleFile = `page/article.html`
	HomeFile    = `page/home.html`
)

func ItemFile(id uint64) string {
	return fmt.Sprintf(`page/item/%03d/%03d.html`, id/1000, id%1000)
}

func NoteFile(year uint32) string {
	return fmt.Sprintf(`page/note/%04d.html`, year)
}

func ErrorFile(code int) string {
	return fmt.Sprintf(`page/error/%d.html`, code)
}
