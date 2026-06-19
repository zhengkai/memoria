// Package migrate 迁移用临时模块
package migrate

import "project/zj"

func run() {
	// File()

	Item()

	testMeta()

	zj.IO(`migrate done`)
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
