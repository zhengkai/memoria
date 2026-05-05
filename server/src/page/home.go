package page

var homeTpl = makeTpl(`home`)
var HomeFile = `page/home.html`

type Home struct {
	Meta *Meta
}

func (p *Page) homeInit() error {

	if p.checkFastPass(HomeFile) {
		return nil
	}

	meta := genMeta(`home`)
	meta.Canonical = `/`

	d := &Home{
		Meta: meta,
	}

	return execTplToFile(HomeFile, homeTpl, d)
}
