// Package item
package item

import "project/pb"

var Get = itemPool.Get

var Clear = itemPool.Clear

func GetItemFull(d *pb.ItemDB) (*pb.Item, error) {

	r, err := revisionPool.Get(d.GetRevisionId())
	if err != nil {
		return nil, err
	}

	ogID := d.GetOgId()
	var og = &pb.OpenGraph{}
	if ogID > 0 {
		err := binPool.Get(ogID, og)
		if err != nil {
			return nil, err
		}
	}

	it := pb.Item_builder{
		Id:      new(d.GetId()),
		Meta:    d.GetMeta(),
		Content: r,
		Og:      og,
	}.Build()

	return it, nil
}
