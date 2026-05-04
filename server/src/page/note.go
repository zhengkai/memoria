package page

import (
	"fmt"
	"os"
	"project/export"
	"project/pb"
	"project/util"
	"regexp"
	"slices"
	"strconv"
)

var reNoteFile = regexp.MustCompile(`^\d{4}\.bin$`)

var noteTpl = makeTpl(`note`, `item`)

const NoteDataDir = `data/note`

type Note struct {
	YearAll    []*NoteYear
	YearSelect uint32
	Item       []*Item
}

type NoteYear struct {
	Year  uint32
	Count int
}

func NoteFile(year uint32) string {
	return fmt.Sprintf(`page/note/%04d.html`, year)
}

func (p *Page) noteInit() error {

	if err := p.refreshNoteYearList(); err != nil {
		return err
	}

	for _, row := range p.NoteYearList {
		note, err := p.loadNote(row)
		if err != nil {
			continue
		}

		file := NoteFile(row.Year)
		execTplToFile(file, noteTpl, note)
	}

	return nil
}

// 准备用于生成页面的数据
func (p *Page) loadNote(ny *NoteYear) (*Note, error) {

	file := export.NoteFileName(ny.Year)

	d := &pb.RenderNoteYear{}

	err := util.ReadStaticData(file, d)
	if err != nil {
		return nil, err
	}

	li := d.GetList()
	ny.Count = len(li)

	n := &Note{
		YearAll:    p.NoteYearList,
		YearSelect: ny.Year,
		Item:       make([]*Item, len(li)),
	}
	for idx, id := range li {
		n.Item[idx] = p.loadItem(id)
	}
	return n, nil
}

func (p *Page) refreshNoteYearList() error {

	entries, err := os.ReadDir(util.Static(NoteDataDir))
	if err != nil {
		return err
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

	p.NoteYearList = yl
	return nil
}
