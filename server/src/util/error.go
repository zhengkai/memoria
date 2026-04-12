package util

import (
	"errors"
	"fmt"
	"project/pb"

	"github.com/go-sql-driver/mysql"
)

type Error struct {
	Code     pb.Error_Code `json:"code"`
	Message  string        `json:"message"`
	Detail   string        `json:"detail,omitempty"`
	Original error         `json:"-"`
}

func (e *Error) Error() string {
	return e.Message
}

func NewError(err error) *Error {

	if target, ok := errors.AsType[*Error](err); ok {
		return target
	}

	detail := ``
	if err != nil {
		detail = err.Error()
	}

	e := &Error{
		Code:     pb.Error_INTERNAL,
		Detail:   detail,
		Original: err,
	}

	if mysql, ok := errors.AsType[*mysql.MySQLError](err); ok {
		code := pb.Error_DB
		if mysql.Number == 1062 {
			code = pb.Error_DB_DUPLICATE
		}
		e.SetCode(code)
	}

	return e
}

func (e *Error) Fill(err error) *Error {

	if err == nil {
		return e
	}

	if target, ok := errors.AsType[*Error](err); ok {
		*e = *target
		return e
	}

	e.SetCode(pb.Error_UNKNOWN)

	if e.Detail == `` {
		e.Detail = err.Error()
	}

	if mysql, ok := errors.AsType[*mysql.MySQLError](err); ok {
		code := pb.Error_DB
		if mysql.Number == 1062 {
			code = pb.Error_DB_DUPLICATE
		}
		e.SetCode(code)
	}

	return e
}

func (e *Error) SetCode(code pb.Error_Code) *Error {

	e.Code = code

	msg, ok := pb.Error_Code_name[int32(e.Code)]
	if !ok {
		e.Code = pb.Error_UNKNOWN
		msg = pb.Format_Enum_name[int32(e.Code)]
	}
	e.Message = msg

	return e
}
func (e *Error) SetMessage(code pb.Error_Code, msg string) *Error {
	e.Code = code
	e.Message = msg
	return e
}

func (e *Error) SetDetail(d string) *Error {
	e.Detail = d
	return e
}

func (e *Error) DetailF(format string, a ...any) *Error {
	if len(a) == 0 {
		e.Detail = format
	}
	e.Detail = fmt.Sprintf(format, a...)
	return e
}

func (e *Error) AsPB() *pb.Error {
	return pb.Error_builder{
		Code:    &e.Code,
		Message: &e.Message,
	}.Build()
}
