SHELL:=/usr/bin/env bash

PB_BIN=../client/node_modules/protobufjs-cli/bin
PB_JS=../client/src/inc/pb

server:
	protoc --go_out=../server/src *.proto
	go run ./codegen/gen.go

client:
	$(PB_BIN)/pbjs -t static-module -w es6 --es6 --force-number -o ${PB_JS}/pb.js *.proto
	$(PB_BIN)/pbts -o ${PB_JS}/pb.d.ts ${PB_JS}/pb.js

all: server client
