package public

import "strings"

func (p *public) route() {

	if p.path == "" || p.path == "/" {
		p.home()
		return
	}

	if strings.HasPrefix(p.path, `style`) {
		p.style()
		return
	}

	if strings.HasPrefix(p.path, `item`) {
		p.item()
		return
	}

	if strings.HasPrefix(p.path, `article`) {
		p.article()
		return
	}

	if strings.HasPrefix(p.path, `note`) || strings.HasPrefix(p.path, `tweet`) {
		p.note()
		return
	}

	// 历史兼容
	if strings.HasPrefix(p.path, `blog`) || strings.HasPrefix(p.path, `post`) || strings.HasPrefix(p.path, `archive`) {
		p.item()
		return
	}

	p.error404()
}
