package export

import (
	"fmt"
	"project/item"
	"project/pb"
	"project/util"
	"project/zj"
)

func ItemFileName(id uint64) string {
	return fmt.Sprintf(`data/item/%03d/%03d.bin`, id/1000, id%1000)
}

func RevisionFileName(id uint64) string {
	return fmt.Sprintf(`data/revision/%03d/%03d.bin`, id/1000, id%1000)
}

func BinFileName(id uint64) string {
	return fmt.Sprintf(`data/bin/%03d/%03d.bin`, id/1000, id%1000)
}

func (g *Export) exportItem() {

	zj.J(`export item:`, len(g.item))
	g.wg.Add(1)
	defer g.wg.Done()

	for _, it := range g.item {
		g.exportItemRow(it)
	}
}

func (g *Export) exportItemRow(it *pb.ItemDB) {

	// itemDB
	err := util.WriteStaticData(
		ItemFileName(it.GetId()),
		it,
	)
	if err != nil {
		g.addFail(fmt.Sprintf(`item %d`, it.GetId()), err)
		return
	}

	// revision
	name := fmt.Sprintf(`item %d revision %d`, it.GetId(), it.GetRevisionId())
	rev, err := item.RevisionGet(it.GetRevisionId())
	if err != nil {
		g.addFail(name, err)
		return
	}
	err = util.WriteStaticData(
		RevisionFileName(it.GetRevisionId()),
		rev,
	)
	if err != nil {
		g.addFail(name, err)
		return
	}

	// og

	if it.GetOgId() > 0 {
		name := fmt.Sprintf(`item %d og %d`, it.GetId(), it.GetOgId())
		bin, err := item.BinGet(it.GetOgId())
		if err != nil {
			g.addFail(name, err)
			return
		}
		err = util.WriteStaticBin(
			BinFileName(it.GetOgId()),
			bin,
		)
		if err != nil {
			g.addFail(name, err)
			return
		}
	}
}
