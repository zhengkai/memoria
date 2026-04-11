package api

import "project/pb"

func (gw *Gateway) dispatch(req *pb.APIReq) *pb.APIRsp {
	rsp := new(pb.APIRsp)
	ae := new(pb.APIError)
	e := &Error{AE: ae}

	switch req.WhichOne() {

	case pb.APIReq_ItemGet_case:
		rsp.SetItemGet(itemGet(req.GetItemGet(), e))

	case pb.APIReq_ItemSet_case:
		rsp.SetItemSet(itemSet(req.GetItemSet(), e))

	case pb.APIReq_ItemListRecent_case:
		rsp.SetItemListRecent(itemListRecent(req.GetItemListRecent(), e))

	case pb.APIReq_ItemSearch_case:
		rsp.SetItemSearch(itemSearch(req.GetItemSearch(), e))
	}
	if ae.GetCode() != pb.APIError_NONE {
		er := pb.APIRsp_builder{Error: ae}.Build()
		return er
	}
	return rsp
}
