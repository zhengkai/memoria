package page

var HomeFile = `page/home.html`

type Home struct {
	Meta *Meta
}

func (p *Page) homeInit() error {

	if p.checkFastPass(HomeFile) {
		return nil
	}

	meta := p.genMeta(`home`)
	meta.Canonical = `/`

	d := &Home{
		Meta: meta,
	}

	return execTplToFile(HomeFile, p.homeTpl, d)
}
