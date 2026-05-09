package page

import "fmt"

const (
	LinkArticle = `/article.html`
	LinkHome    = `/`
)

func LinkItem[T PItem | uint64](id T) string {
	return fmt.Sprintf(`/item/%d.html`, id)
}

func LinkNote[T PNote | uint32](year T) string {
	return fmt.Sprintf(`/note-%d.html`, year)
}

func LinkItemInNote[T PNote | uint32, T2 PItem | uint64](year T, id T2) string {
	return fmt.Sprintf(`/note/%04d.html#n%d`, year, id)
}

func (m *Manager) FullLink(path string) string {
	return `https://` + m.config.GetDomain() + m.config.GetPathPrefix() + path
}
