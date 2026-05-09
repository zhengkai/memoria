package page

type Meta struct {
	SiteName  string
	Domain    string
	Style     string
	Favicon   string
	Canonical string
	BodyClass string
	Title     string
	File      string
}

func (m *Manager) setMeta(bodyClass string, meta *Meta) {
	meta.SiteName = m.config.GetSiteName()
	meta.Domain = m.config.GetDomain()
	meta.Style = m.styleLink
	meta.Favicon = m.faviconLink
	meta.BodyClass = bodyClass
	meta.Title = ``
}
