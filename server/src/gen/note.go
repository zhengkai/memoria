package gen

import (
	"fmt"
	"project/pb"
	"project/util"
	"project/zj"
)

func NoteFileName(year uint32) string {
	return fmt.Sprintf(`data/note/%04d.bin`, year)
}

func (g *Gen) genNote(year uint32) {

	zj.J(`gen note:`, year)
	g.wg.Add(1)
	defer g.wg.Done()

	li := g.note.year[year]

	sortItemList(li)

	d := pb.RenderNoteYear_builder{
		Year: &year,
		List: make([]uint64, len(li)),
	}
	for idx, v := range li {
		d.List[idx] = v.GetId()
	}

	file := NoteFileName(year)

	g.addFail(
		fmt.Sprintf(`note %d`, year),
		util.WriteStaticData(file, d.Build()),
	)
}
