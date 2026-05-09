package page

type Home struct {
	Meta *Meta
}

func (m *Manager) homeInit() error {

	meta := m.genMeta(`home`)
	meta.Canonical = m.LinkHome()

	d := &Home{
		Meta: meta,
	}

	return execTplToFile(FileHome, m.homeTpl, d)
}
