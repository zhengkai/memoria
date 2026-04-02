SHELL:=/bin/bash

TARGET_HOST:=freya

build: git
	sudo docker build -t memoria -f Dockerfile ../..

run: build
	sudo docker run --env \
		--mount type=bind,source=/www/memoria/static,target=/static \
		--mount type=bind,source=/www/memoria/server/dist/prod/log,target=/log \
		memoria

install: build
	sudo docker save memoria > docker-memoria.tar
	scp docker-memoria.tar $(TARGET_HOST):/tmp
	scp install.sh $(TARGET_HOST):/tmp
	ssh $(TARGET_HOST) "chmod +x /tmp/install.sh && /tmp/install.sh && rm /tmp/install.sh"

git:
	../../server/build/git-hash.sh > ../../server/build/.git-hash

clean:
	sudo docker stop memoria || :
	sudo docker rm memoria || :
	sudo docker rmi memoria || :
	sudo docker image prune --force
