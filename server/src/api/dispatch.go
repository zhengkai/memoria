package api

import (
	"project/pb"
	"project/util"
	"project/zj"

	"google.golang.org/protobuf/reflect/protoreflect"
)

func (gw *Gateway) dispatch(req *pb.APIReq) *pb.APIRsp {
	rsp := new(pb.APIRsp)
	e := &util.Error{Message: `ok`}
	zj.IO("api req:", getReqOneName(req))

	// 注意：switch { } 里的内容由 proto/gen/gen.go 生成
	switch req.WhichOne() {

	case pb.APIReq_ItemGet_case:
		rsp.SetItemGet(itemGet(req.GetItemGet(), e))

	case pb.APIReq_ItemSet_case:
		rsp.SetItemSet(itemSet(req.GetItemSet(), e))

	case pb.APIReq_ItemListRecent_case:
		rsp.SetItemListRecent(itemListRecent(req.GetItemListRecent(), e))

	case pb.APIReq_ItemSearch_case:
		rsp.SetItemSearch(itemSearch(req.GetItemSearch(), e))

	default:
		e.SetMessage(pb.Error_INPUT_MISSING, "missing oneof field")
	}

	if e.Code != pb.Error_NONE {
		er := pb.APIRsp_builder{Error: e.AsPB()}.Build()
		zj.WF(`api error %3d: %s`, e.Code, e.Message)
		if e.Detail != `` {
			zj.W(`	detail: %s`, e.Detail)
		}
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
