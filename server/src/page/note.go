package page

import (
	"os"
	"project/export"
	"project/pb"
	"project/util"
	"project/zj"
	"regexp"
	"slices"
	"strconv"
)

var reNoteFile = regexp.MustCompile(`^\d{4}\.bin$`)

const NoteDataDir = `data/note`

type Note struct {
	YearAll    []uint32
	YearSelect uint32
	Item       []*Item
}

func (p *Page) noteInit() error {

	if err := p.refreshNoteYearList(); err != nil {
		return err
	}

	for _, year := range p.NoteYearList {
		note, err := p.loadNote(year)
		if err != nil {
			continue
		}

		buf, _ := execTpl(noteTpl, note)
		zj.IO(buf.String())

		return nil
	}

	return nil
}

func (p *Page) loadNote(year uint32) (*Note, error) {

	file := export.NoteFileName(year)

	d := &pb.RenderNoteYear{}

	err := util.ReadStaticData(file, d)
	if err != nil {
		return nil, err
	}

	li := d.GetList()

	n := &Note{
		YearAll:    p.NoteYearList,
		YearSelect: year,
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

	yl := make([]uint32, 0, 50)
	for _, e := range entries {
		if e.IsDir() {
			continue
		}

		s := e.Name()
		if !reNoteFile.MatchString(e.Name()) {
			continue
		}
		i64, _ := strconv.ParseUint(s[:4], 10, 32)
		yl = append(yl, uint32(i64))
	}

	slices.Reverse(yl)

	p.NoteYearList = yl
	return nil
}
