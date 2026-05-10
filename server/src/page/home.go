package page

type Home struct {
	Meta
}

func (m *Manager) homeInit() {

	d := &Home{}
	m.setMeta(`home`, d)
	d.Canonical = LinkHome

	m.genPage(FileHome, d, m.homeTpl)
}
