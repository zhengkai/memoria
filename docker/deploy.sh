#!/bin/bash -e

cd "$(dirname "$(readlink -f "$0")")" || exit 1

sudo docker pull zhengkai/memoria:latest

if [ ! -e env.sh ]; then
	cp env.sh.example env.sh
	mkdir -p static
	echo "export MEMORIA_DIR=\"$(pwd)/static\"" >> env.sh
fi
. ./env.sh

sudo docker stop memoria || :
sudo docker rm memoria || :

set -x
sudo docker run -d --name memoria \
	--env "MEMORIA_MYSQL=${MEMORIA_MYSQL}" \
	-p "${MEMORIA_WEB}:80" \
	--mount "type=bind,source=${MEMORIA_DIR},target=/static" \
	--restart always \
	zhengkai/memoria:latest
