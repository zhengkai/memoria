package page

var homeTpl = makeTpl(`home`)
var HomeFile = `page/home.html`

type Home struct {
	Meta *Meta
}

func (p *Page) homeInit() error {

	meta := genMeta(`home`)
	meta.Canonical = `/`

	d := &Home{
		Meta: meta,
	}

	return execTplToFile(HomeFile, homeTpl, d)
}
