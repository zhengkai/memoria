package page

type Meta struct {
	SiteName     string
	SiteBaseLink string
	Style        string
	Favicon      string
	Canonical    string
	BodyClass    string
	Title        string
	File         string

	Internal bool
}

type IMeta interface {
	GetCanonical() string
	IsInternal() bool
}

func (m *Meta) GetCanonical() string {
	return m.Canonical
}

func (m *Meta) IsInternal() bool {
	return m.Internal
}

func (m *Manager) setMeta(bodyClass string, meta *Meta) {
	meta.SiteName = m.config.GetSiteName()
	meta.SiteBaseLink = m.siteBase
	meta.Style = m.styleLink
	meta.Favicon = m.faviconLink
	meta.BodyClass = bodyClass
	meta.Title = ``
}
