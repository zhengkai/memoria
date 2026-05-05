package public

import "strings"

func (p *public) route(path string) {

	if path == "" || path == "/" {
		p.home()
		return
	}

	if strings.HasPrefix(path, `style`) {
		p.style()
		return
	}

	if strings.HasPrefix(path, `item`) {
		p.item(path)
		return
	}

	if strings.HasPrefix(path, `article`) {
		p.article()
		return
	}

	if strings.HasPrefix(path, `note`) || strings.HasPrefix(path, `tweet`) {
		p.note(path)
		return
	}

	// 历史兼容
	if strings.HasPrefix(path, `blog`) || strings.HasPrefix(path, `post`) || strings.HasPrefix(path, `archive`) {
		p.item(path)
		return
	}
}
