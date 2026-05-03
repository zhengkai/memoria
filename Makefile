SHELL:=/usr/bin/env bash

-include ./server/build/config.ini

start:
	./server/build/run-server.sh $(type)

stop:
	./server/build/stop-server.sh $(type)

dev:
	./server/build/run-server.sh dev

stopdev:
	./server/build/stop-server.sh dev

prod:
	./server/build/run-server.sh prod

stopprod:
	./server/build/stop-server.sh prod

.PHONY: docker
docker:
	@if [ ! -d "client/dist-git" ]; then \
		git clone --branch=client-dist --depth 1 https://github.com/zhengkai/memoria.git client/dist-git; \
	fi
	sudo docker build -t memoria -f docker/Dockerfile .

doc:
	cd server/src && godoc -http=:6060
