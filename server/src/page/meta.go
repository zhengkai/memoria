package page

import (
	"project/config"
)

type Meta struct {
	SiteName  string
	SiteBase  string
	Canonical string
	BodyClass string
	Title     string
}

func genMeta(bodyClass string) *Meta {
	return &Meta{
		SiteName:  config.SiteName,
		SiteBase:  config.SiteBase,
		BodyClass: bodyClass,
		Title:     ``,
	}
}
