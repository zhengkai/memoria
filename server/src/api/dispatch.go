package api

import (
	"project/pb"
	"project/zj"

	"google.golang.org/protobuf/reflect/protoreflect"
)

func (gw *Gateway) dispatch(req *pb.APIReq) *pb.APIRsp {
	rsp := new(pb.APIRsp)
	ae := new(pb.APIError)
	e := &Error{AE: ae}

	// util.DebugPB(req)

	zj.IO("api req:", getReqOneName(req))

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

func getReqOneName(req *pb.APIReq) string {
	which := req.WhichOne()
	if which == pb.APIReq_One_not_set_case {
		return "not_set"
	}

	fieldNum := protoreflect.FieldNumber(which)
	fd := req.ProtoReflect().Descriptor().Fields().ByNumber(fieldNum)
	if fd == nil {
		return "unknown"
	}
	return string(fd.Name())
}
