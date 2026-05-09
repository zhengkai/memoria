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

func (m *Manager) FullLink(path string) string {
	return fmt.Sprintf(`https://%s%s`, m.config.GetDomain(), path)
}

func (m *Manager) LinkItem(id uint64) string {
	return m.link(`/item/%d.html`, id)
}

func (m *Manager) LinkNote(year uint32) string {
	return m.link(`/note-%d.html`, year)
}

func (m *Manager) LinkItemInNote(year uint32, id uint64) string {
	return m.link(`/note/%04d.html#n%d`, year, id)
}

func (m *Manager) LinkNoteMax() string {
	return m.link(`/note-%d.html`, m.MaxNoteYear)
}

func (m *Manager) LinkArticle() string {
	return m.linkPath(LinkArticle)
}

func (m *Manager) LinkHome() string {
	return m.linkPath(LinkHome)
}

func (m *Manager) linkPath(path string) string {
	if m.config.HasPathPrefix() {
		return m.config.GetPathPrefix() + path
	}
	return path
}

func (m *Manager) link(format string, arg ...any) string {
	link := fmt.Sprintf(format, arg...)
	if m.config.HasPathPrefix() {
		return m.config.GetPathPrefix() + link
	}
	return link
}
