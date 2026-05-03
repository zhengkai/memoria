package render

import (
	"os"
	"project/gen"
	"project/pb"
	"project/util"
	"project/zj"
	"regexp"
)

func Test() {
	TestScan()
	// TestBasic()
}

func TestBasic() {

	ab, err := Markdown("# Hello\n\n- item 1\n- item 2\n")
	zj.J(string(ab), err)

	ab, err = ASCIIDoc("# Hello\n\n- item 1\n- item 2\n")
	zj.J(string(ab), err)

	ab, err = Plain("\n\nabc\n\n123\n456\n")
	zj.J(string(ab), err)
}

func TestScan() {

	dir := `data/note`

	entries, err := os.ReadDir(util.Static(dir))
	if err != nil {
		panic(err)
	}

	re := regexp.MustCompile(`^\d{4}\.bin$`)

	for _, e := range entries {
		if e.IsDir() {
			continue
		}

		ok := re.MatchString(e.Name())
		if ok {
			TestNote(dir + `/` + e.Name())
			return
		}
	}
}

func TestNote(file string) {
	d := &pb.RenderNoteYear{}
	if err := util.ReadStaticData(file, d); err != nil {
		zj.WF(`read %s failed: %v`, file, err)
		return
	}

	for _, id := range d.GetList() {
		TestItem(id)
	}

}

func TestItem(id uint64) {

	it := &pb.ItemDB{}
	if err := util.ReadStaticData(gen.ItemFileName(id), it); err != nil {
		zj.WF(`read item %d failed: %v`, id, err)
		return
	}

	// zj.J(`GetRevisionId`, it.GetRevisionId())

	ab, err := Render(it)
	zj.J(string(ab), err)
}
