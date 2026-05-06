SHELL:=/usr/bin/env bash

-include ./server/build/config.ini

start: check-static
	./server/build/run-server.sh $(type)

stop:
	./server/build/stop-server.sh $(type)

dev: check-static
	./server/build/run-server.sh dev

stopdev:
	./server/build/stop-server.sh dev

prod: check-static
	./server/build/run-server.sh prod

stopprod:
	./server/build/stop-server.sh prod

.PHONY: docker
docker:
	@if [ ! -d "client/dist-git" ]; then \
		git clone --branch=client-dist --depth 1 https://github.com/zhengkai/memoria.git client/dist-git; \
	fi
	sudo docker build -t memoria -f docker/Dockerfile .

check-static:
	@if [ ! -f "static/config-page.json" ]; then \
		mkdir -p static; \
		cp misc/config-page.json static/; \
	fi

doc:
	cd server/src && godoc -http=:6060

status:
	./server/build/status.sh dev

dump:
	curl 'https://memoria.anna.9farm.com/api/export'

dump-full:
	curl 'https://memoria.anna.9farm.com/api/export?full'
