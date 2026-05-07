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

func (p *Page) genMeta(bodyClass string) *Meta {
	return &Meta{
		SiteName:  p.config.GetSiteName(),
		Domain:    p.config.GetDomain(),
		Style:     p.styleLink,
		Favicon:   p.faviconLink,
		BodyClass: bodyClass,
		Title:     ``,
	}
}
