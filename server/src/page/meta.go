package page

type Meta struct {
	SiteName  string
	Domain    string
	Style     string
	Favicon   string
	Canonical string
	BodyClass string
	Title     string
}

func (m *Manager) genMeta(bodyClass string) *Meta {
	return &Meta{
		SiteName:  m.config.GetSiteName(),
		Domain:    m.config.GetDomain(),
		Style:     m.styleLink,
		Favicon:   m.faviconLink,
		BodyClass: bodyClass,
		Title:     ``,
	}
}
