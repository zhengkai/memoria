# builder stage

FROM golang:latest AS builder

ARG DOCKER_RUNNING=yes
ARG DEBIAN_FRONTEND=noninteractive
RUN apt update && apt install -yq protobuf-compiler unzip
RUN go install google.golang.org/protobuf/cmd/protoc-gen-go@v1.36.11

RUN curl -s -L https://github.com/protocolbuffers/protobuf/releases/download/v34.1/protoc-34.1-linux-x86_64.zip -o /usr/local/src/protoc-linux-x86_64.zip \
	&& ls -al /usr/local/src \
	&& unzip -o /usr/local/src/protoc-linux-x86_64.zip -d /usr/local bin/protoc \
	&& unzip -o /usr/local/src/protoc-linux-x86_64.zip -d /usr/local 'include/*'

WORKDIR /project

COPY server/src/go.mod server/src/go.sum ./
RUN --mount=type=cache,target=/go/pkg/mod \
	--mount=type=cache,target=/root/.cache/go-build \
	go mod graph && go mod download && rm -f go.mod go.sum

COPY . .

RUN cd proto && make server

RUN --mount=type=cache,target=/go/pkg/mod \
	--mount=type=cache,target=/root/.cache/go-build \
	/project/server/build/build-server.sh prod

# clean stage

FROM alpine:latest

RUN mkdir /static

COPY --from=builder /project/server/dist/prod/memoria-server-next /memoria-server

COPY client/dist-git/ /public

ENV TZ="Asia/Shanghai"

ENV MEMORIA_WEB=":80"
ENV MEMORIA_DIR="/static"
ENV MEMORIA_CLIENT="/public"

EXPOSE 80

CMD ["/memoria-server"]
