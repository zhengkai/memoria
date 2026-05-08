package page

import "fmt"

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
	return m.linkPath(`/article.html`)
}

func (m *Manager) LinkHome() string {
	return m.linkPath(`/`)
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
