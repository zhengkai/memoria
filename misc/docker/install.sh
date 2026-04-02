#!/bin/bash

TARGET="Freya"

if [ "$HOSTNAME" != "$TARGET" ]; then
	>&2 echo only run in server "$TARGET"
	exit 1
fi

sudo docker stop memoria
sudo docker rm memoria
sudo docker rmi memoria

sudo cat /tmp/docker-memoria.tar | sudo docker load

sudo docker run -d --name memoria \
	--mount type=bind,source=/www/memoria/log,target=/log \
	--mount type=bind,source=/www/memoria/static,target=/static \
	--restart always \
	memoria
