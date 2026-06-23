// Package item
package item

import (
	"project/pb"
	"project/pg"
)

var Get = itemPool.Get

var Clear = itemPool.Clear

func GetItemFull(d *pb.ItemDBv2) (*pb.ItemV2, error) {

	meta, e2 := pg.GetMeta(d.GetMetaRevisionId())
	if e2 != nil {
		return nil, e2
	}

	content, e2 := pg.GetContent(d.GetContentRevisionId())
	if e2 != nil {
		return nil, e2
	}

	re := pb.ItemV2_builder{
		Id:        new(d.GetId()),
		Meta:      meta,
		Content:   content,
		TsMeta:    new(d.GetTsMeta()),
		TsContent: new(d.GetTsContent()),
		TsCreate:  new(d.GetTsCreate()),
	}.Build()

	return re, nil
}
