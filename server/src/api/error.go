package api

import "project/pb"

type IError interface {
	Fill(pb.APIError_Enum, string)
	SetInput()
	SetDB()
}

type Error struct {
	AE *pb.APIError
}

func (e *Error) Fill(code pb.APIError_Enum, msg string) {
	e.AE.SetCode(code)
	e.AE.SetMessage(msg)
}

func (e *Error) SetInput() {
	e.AE.SetCode(pb.APIError_INPUT)
	e.AE.SetMessage(`input error`)
}

func (e *Error) SetDB() {
	e.AE.SetCode(pb.APIError_DB)
	e.AE.SetMessage(`db fail`)
}
