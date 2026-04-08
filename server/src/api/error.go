package api

import "project/pb"

var (
	ErrUnknown = &pb.APIError{Code: 1, Message: `unknown`}
	ErrDBFail  = &pb.APIError{Code: 2, Message: `db fail`}
)
