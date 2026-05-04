package page

import (
	"html/template"
	"project/export"
	"project/render"
	"project/util"
)

func (p *Page) loadItem(id uint64) (re *Item) {

	re = p.Item[id]
	if re != nil {
		return re
	}

	re = &Item{
		ID: id,
	}
	p.Item[id] = re

	re.Error = util.ReadStaticData(export.ItemFile(id), &re.DB)
	if re.Error != nil {
		return
	}

	ab, err := render.Render(&re.DB)
	if err != nil {
		re.Error = err
		return
	}
	re.Content = template.HTML(ab)

	// TODO og

	return
}
