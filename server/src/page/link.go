package page

import "fmt"

func (p *Page) LinkItem(id uint64) string {
	return p.link(`/item/%d.html`, id)
}

func (p *Page) LinkNote(year uint32) string {
	return p.link(`/note-%d.html`, year)
}

func (p *Page) LinkNoteMax() string {
	return p.link(`/note-%d.html`, p.maxNoteYear)
}

func (p *Page) LinkArticle() string {
	return p.linkPath(`/article.html`)
}

func (p *Page) LinkHome() string {
	return p.linkPath(`/`)
}

func (p *Page) linkPath(path string) string {
	if p.config.HasPathPrefix() {
		return p.config.GetPathPrefix() + path
	}
	return path
}

func (p *Page) link(format string, arg ...any) string {
	link := fmt.Sprintf(format, arg...)
	if p.config.HasPathPrefix() {
		return p.config.GetPathPrefix() + link
	}
	return link
}
