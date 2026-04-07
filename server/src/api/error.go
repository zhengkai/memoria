package api

import "project/pb"

var (
	ErrDBFail = &pb.APIError{Code: 1, Message: `db fail`}
)
