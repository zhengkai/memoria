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

	Internal bool
}

type IMeta interface {
	GetMeta() *Meta
}

func (m *Meta) GetMeta() *Meta {
	return m
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
}
