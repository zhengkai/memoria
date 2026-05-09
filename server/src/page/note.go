package page

import (
	"os"
	"project/export"
	"project/pb"
	"project/util"
	"regexp"
	"slices"
	"strconv"
)

var reNoteFile = regexp.MustCompile(`^\d{4}\.bin$`)

type Note struct {
	Meta       *Meta
	YearAll    []*NoteYear
	YearSelect uint32
	Item       []*Item
}

type NoteYear struct {
	Year  uint32
	Count int
}

func (m *Manager) noteInit() error {

	li := make([]*Note, len(m.noteYearList))

	for idx, row := range m.noteYearList {
		note, err := m.loadNote(row)
		if err != nil {
			continue
		}
		li[idx] = note
	}

	for _, note := range li {
		if note == nil {
			continue
		}
		file := FileNote(note.YearSelect)
		execTplToFile(file, m.noteTpl, note)
	}

	return nil
}

// 准备用于生成页面的数据
func (m *Manager) loadNote(ny *NoteYear) (*Note, error) {

	file := export.NoteFileName(ny.Year)

	d := &pb.RenderNoteYear{}

	err := util.ReadStaticData(file, d)
	if err != nil {
		return nil, err
	}

	li := d.GetList()
	ny.Count = len(li)

	meta := m.genMeta(`tweet`)
	meta.Canonical = m.LinkNote(ny.Year)

	n := &Note{
		Meta:       meta,
		YearAll:    m.noteYearList,
		YearSelect: ny.Year,
		Item:       make([]*Item, len(li)),
	}
	for idx, id := range li {
		it := m.loadItem(id)
		it.NoteYear = ny.Year
		n.Item[idx] = it
	}
	return n, nil
}

func getNoteYearList() ([]*NoteYear, error) {

	entries, err := os.ReadDir(util.Static(export.NoteDataDir))
	if err != nil {
		return nil, err
	}

	yl := make([]*NoteYear, 0, 50)
	for _, e := range entries {
		if e.IsDir() {
			continue
		}

		s := e.Name()
		if !reNoteFile.MatchString(e.Name()) {
			continue
		}
		i64, _ := strconv.ParseUint(s[:4], 10, 32)
		yl = append(yl, &NoteYear{
			Year: uint32(i64),
		})
	}

	slices.Reverse(yl)
	return yl, nil
}
