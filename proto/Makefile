SHELL:=/bin/bash

PBJS=../client/node_modules/protobufjs-cli/bin/pbjs
PBTS=../client/node_modules/protobufjs-cli/bin/pbts

server:
	protoc --go_out=../server/src *.proto
	go run ./gen/gen.go

client:
	$(PBJS) -t static-module -w es6 --es6 --force-number -o ../client/src/pb/pb.js *.proto
	$(PBTS) -o ../client/src/pb/pb.d.ts ../client/src/pb/pb.js

all: server client
