# builder stage

FROM golang:latest AS builder

ARG DOCKER_RUNNING=yes
ARG DEBIAN_FRONTEND=noninteractive
RUN apt update && apt install -yq protobuf-compiler 
RUN go install google.golang.org/protobuf/cmd/protoc-gen-go@v1.34.2

COPY . /project

RUN cd /project/proto && make

RUN --mount=type=cache,target=/go/pkg/mod \
	--mount=type=cache,target=/root/.cache/go-build \
	/project/server/build/build-server.sh prod

# clean stage

FROM alpine

RUN mkdir /static

RUN apk add --no-cache gzip brotli tzdata ca-certificates 

COPY --from=builder /project/server/dist/prod/memoria-server-next /memoria-server

ENV TZ=Asia/Shanghai

ENV MEMORIA_MYSQL=memoria:memoria@tcp(172.17.0.1:3306)/memoria
ENV MEMORIA_DIR=/static

CMD ["/memoria-server"]
