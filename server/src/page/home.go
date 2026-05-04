package page

var homeTpl = makeTpl(`home`)
var HomeFile = `page/home.html`

func (p *Page) homeInit() error {
	return execTplToFile(HomeFile, homeTpl, nil)
}
