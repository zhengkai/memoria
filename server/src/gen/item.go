package gen

import (
	"fmt"
	"project/item"
	"project/util"
	"project/zj"
)

func ItemFileName(id uint64) string {
	return fmt.Sprintf(`data/item/%03d/%03d.bin`, id/1000, id%1000)
}

func (g *Gen) genItem() {

	zj.J(`gen item:`, len(g.item))
	g.wg.Add(1)
	defer g.wg.Done()

	for _, d := range g.item {
		it, err := item.GetItemFull(d)

		name := fmt.Sprintf(`item %d`, d.GetId())

		if err != nil {
			g.addFail(name, err)
			zj.W(`gen item fail:`, err)
			continue
		}

		err = util.WriteStaticData(
			ItemFileName(it.GetId()),
			it,
		)
		if err != nil {
			g.addFail(name, err)
		}
	}
}
