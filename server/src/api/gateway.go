// Package api
package api

import (
	"io"
	"net/http"
	"project/pb"
	"strconv"
	"strings"

	"google.golang.org/protobuf/encoding/protojson"
	"google.golang.org/protobuf/proto"
)

type Gateway struct {
	w    http.ResponseWriter
	r    *http.Request
	gzip bool
	json bool
}

var jsonUnmarshaler = protojson.UnmarshalOptions{
	DiscardUnknown: true,
}

var jsonMarshaler = protojson.MarshalOptions{
	Multiline:         true,
	Indent:            `  `,
	UseProtoNames:     true,
	UseEnumNumbers:    true,
	EmitUnpopulated:   true,
	EmitDefaultValues: true,
}

const postMaxSize = int64(1e6)

const mimeProto = `application/protobuf`
const mimeJSON = `application/protobuf+json`

func (gw *Gateway) readBody() (body []byte, ok bool) {

	mime := strings.SplitN(gw.r.Header.Get(`Content-Type`), `;`, 2)[0]
	if mime == mimeJSON {
		gw.json = true
	} else if mime != mimeProto {
		gw.error(`unsupported content type`, http.StatusUnsupportedMediaType)
		return
	}

	body, err := io.ReadAll(io.LimitReader(gw.r.Body, postMaxSize))
	if err != nil {
		gw.error(`read body fail`, http.StatusBadRequest)
		return
	}

	if len(body) == 0 {
		gw.error(`empty body`, http.StatusBadRequest)
		return
	}

	ok = true
	return
}

func (gw *Gateway) unmarshalReq(body []byte) (*pb.APIReq, error) {

	req := &pb.APIReq{}
	var err error
	if gw.json {
		err = jsonUnmarshaler.Unmarshal(body, req)
	} else {
		err = proto.Unmarshal(body, req)
	}
	if err != nil {
		gw.error(`unmarshal fail`, http.StatusBadRequest)
		return nil, err
	}
	return req, nil
}

func (gw *Gateway) marshalRsp(rsp *pb.APIRsp) {

	var err error

	var ab []byte
	if gw.json {
		ab, err = jsonMarshaler.Marshal(rsp)
	} else {
		ab, err = proto.Marshal(rsp)
	}

	if err != nil {
		gw.w.WriteHeader(http.StatusInternalServerError)
		return
	}

	header := gw.w.Header()
	if gw.json {
		header.Set(`Content-Type`, mimeJSON)
	} else {
		header.Set(`Content-Type`, mimeProto)
	}
	header.Set(`Content-Length`, strconv.Itoa(len(ab)))
	gw.w.Write(ab)
}
