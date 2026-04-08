package api

import "project/pb"

func (gw *Gateway) dispatch(req *pb.APIReq) (rsp pb.IfAPIRspOne, ae *pb.APIError) {
	switch r := req.One.(type) {
	case *pb.APIReq_ItemGet:
		x := &pb.APIRsp_ItemGet{}
		x.ItemGet, ae = itemGet(r.ItemGet)
		rsp = x
	case *pb.APIReq_ItemSet:
		x := &pb.APIRsp_ItemSet{}
		x.ItemSet, ae = itemSet(r.ItemSet)
		rsp = x
	case *pb.APIReq_ItemListRecent:
		x := &pb.APIRsp_ItemListRecent{}
		x.ItemListRecent, ae = itemListRecent(r.ItemListRecent)
		rsp = x
	}
	return
}
