package export

import (
	"fmt"
	"project/pb"
	"project/util"
	"project/zj"
)

const NoteDataDir = `data/note`

func NoteFileName(year uint32) string {
	return fmt.Sprintf(`%s/%04d.bin`, NoteDataDir, year)
}

func (g *Export) exportNote(year uint32) {

	li := g.note.year[year]
	zj.F(`export note: %d (%d)`, year, len(li))

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
