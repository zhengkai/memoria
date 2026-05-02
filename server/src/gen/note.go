package gen

import "project/zj"

func (g *Gen) genNote(year uint32) bool {

	zj.J(`gen note:`, year)

	return true
}
