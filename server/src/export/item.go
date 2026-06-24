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
	return fmt.Sprintf(`%s/item/%03d/%03d.bin`, DataDir, id/1000, id%1000)
}

func RevisionFile(id uint64) string {
	return fmt.Sprintf(`%s/revision/%03d/%03d.bin`, DataDir, id/1000, id%1000)
}

func BinFile(id uint64) string {
	return fmt.Sprintf(`%s/bin/%03d/%03d.bin`, DataDir, id/1000, id%1000)
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
	err := util.WriteStaticData(ItemFile(id), it)
	if err != nil {
		g.addFail(fmt.Sprintf(`item %d`, id), err)
		return
	}

	// revision
	mid := it.GetContentRevisionId()
	meta, e2 := pg.GetMeta(mid)
	if e2 != nil {
		err = e2
	}
	name := fmt.Sprintf(`item %d, content %d`, id, mid)
	g.writeRev(mid, name, meta, err)

	cid := it.GetMetaRevisionId()
	content, e3 := pg.GetContent(cid)
	if e3 != nil {
		err = e3
	}
	name = fmt.Sprintf(`item %d, content %d`, id, cid)
	g.writeRev(cid, name, content, err)
}

func (g *Export) writeRev(rid uint64, name string, m proto.Message, err error) {
	if err != nil {
		g.addFail(name, err)
		return
	}
	file := RevisionFile(rid)
	e2 := util.WriteStaticData(file, m)
	if e2 != nil {
		g.addFail(name, e2)
	}
}
