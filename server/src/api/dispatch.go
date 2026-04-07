package api

import "project/pb"

func (gw *Gateway) dispatch(req *pb.APIReq) (rsp pb.IfAPIRspOne, ae *pb.APIError) {
	switch r := req.One.(type) {
	case *pb.APIReq_ItemEdit:
		x := &pb.APIRsp_ItemEdit{}
		x.ItemEdit, ae = itemEdit(r.ItemEdit)
		rsp = x
	}
	return
}
