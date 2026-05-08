package page

type Home struct {
	Meta *Meta
}

func (m *Manager) homeInit() error {

	if m.checkFastPass(HomeFile) {
		return nil
	}

	meta := m.genMeta(`home`)
	meta.Canonical = m.LinkHome()

	d := &Home{
		Meta: meta,
	}

	return execTplToFile(HomeFile, m.homeTpl, d)
}
