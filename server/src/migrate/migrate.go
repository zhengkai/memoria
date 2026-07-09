// Package migrate 迁移用临时模块
package migrate

import (
	"project/pb"
	"project/pg"
	"project/zj"
)

func run() {

	reset()

	File()

	Item()

	testMeta()

	zj.IO(`migrate done`)
}

func reset() {
	pg.TRUNCATE(`edit_history`)
	pg.TRUNCATE(`export_time`)
	pg.TRUNCATE(`item`)
	pg.TRUNCATE(`file`)
	pg.TRUNCATE(`revision`)

	c := &pb.ItemContent{}
	pg.InsertContent(c)

}

func testMeta() {

	// o := &pb.ItemMetaV2{}
	//
	// id, err := pg.InsertMeta(o)
	// if err != nil {
	// 	zj.W(err.Original.Error())
	// }
	// zj.J(`meta`, id, err)
}
