package page

import (
	"project/pb"
	"project/util"
	"project/zj"

	"google.golang.org/protobuf/encoding/protojson"
)

const configFile = `config-page.json`

var unmarshaler = protojson.UnmarshalOptions{
	AllowPartial:   true,
	DiscardUnknown: true,
}

var defaultConfig = pb.PageConfig_builder{
	SiteName:   new(`Soulogic`),
	Domain:     new(`soulogic.com`),
	PathPrefix: new(``),
}.Build()

func (p *Page) loadConfig() {

	p.config = defaultConfig

	c := &pb.PageConfig{}
	ab, err := util.ReadStaticBin(configFile)
	if err != err {
		return
	}

	if err := unmarshaler.Unmarshal(ab, c); err != nil {
		zj.W(configFile, `unmarshal fail:`, err)
		return
	}

	if !c.HasSiteName() {
		zj.W(configFile, `missing "site_name"`)
		return
	}

	if !c.HasDomain() {
		zj.W(configFile, `missing "domain"`)
		return
	}

	p.config = c
}
