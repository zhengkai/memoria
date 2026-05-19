package page

type Meta struct {
	SiteName      string
	SiteBaseLink  string
	Style         string
	Favicon       string
	Canonical     string
	BodyClass     string
	Title         string
	File          string
	HeaderExpires Expire

	NavHome    string
	NavArticle string
	NavNote    string
	NavCurated string

	Internal bool
}

type IMeta interface {
	GetMeta() *Meta
}

func (m *Meta) GetMeta() *Meta {
	return m
}

func (m *Meta) AddClass(s string) {
	m.BodyClass += ` ` + s
}

func (m *Manager) setMeta(bodyClass string, d IMeta) {
	meta := d.GetMeta()
	meta.SiteName = m.config.GetSiteName()
	meta.SiteBaseLink = m.siteBase
	meta.Style = m.styleLink
	meta.Favicon = m.faviconLink
	meta.BodyClass = bodyClass
	meta.HeaderExpires = ExpireMiddle
	meta.Title = ``

	meta.NavHome = m.config.GetPathPrefix() + LinkHome
	meta.NavArticle = m.config.GetPathPrefix() + LinkArticle
	meta.NavCurated = m.config.GetPathPrefix() + LinkCurated
	meta.NavNote = m.config.GetPathPrefix() + LinkNote(m.MaxNoteYear)
}
