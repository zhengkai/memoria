package export

import (
	"fmt"
	"project/pb"
	"project/pg"
	"project/util"
	"project/zj"

	"google.golang.org/protobuf/proto"
)

func ItemFile(id uint64) string {
	return fmt.Sprintf(`data/item/%03d/%03d.bin`, id/1000, id%1000)
}

func RevisionFile(id uint64) string {
	return fmt.Sprintf(`data/revision/%03d/%03d.bin`, id/1000, id%1000)
}

func BinFile(id uint64) string {
	return fmt.Sprintf(`data/bin/%03d/%03d.bin`, id/1000, id%1000)
}

func (g *Export) exportItem() {

	zj.J(`export item:`, len(g.item))

	for _, it := range g.item {
		g.exportItemRow(it)
	}
}

func (g *Export) exportItemRow(it *pb.ItemDBv2) {

	id := it.GetId()

	// itemDB
	err := util.WriteStaticData(
		ItemFile(id),
		it,
	)
	if err != nil {
		g.addFail(fmt.Sprintf(`item %d`, id), err)
		return
	}

	// revision
	mid := it.GetContentRevisionId()
	meta, err := pg.GetMeta(mid)
	name := fmt.Sprintf(`item %d, content %d`, id, mid)
	g.writeRev(mid, name, meta, err)

	cid := it.GetMetaRevisionId()
	content, err := pg.GetContent(cid)
	name = fmt.Sprintf(`item %d, content %d`, id, cid)
	g.writeRev(cid, name, content, err)
}

func (g *Export) writeRev(rid uint64, name string, m proto.Message, err error) {
	if err != nil {
		g.addFail(name, err)
		return
	}
	file := RevisionFile(rid)
	e2 := util.WriteStaticData(
		file,
		m,
	)
	if err != nil {
		g.addFail(name, e2)
	}
}
