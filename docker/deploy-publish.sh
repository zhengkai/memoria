#! /usr/bin/env bash

DOCKER_NAME="memoria-publish"

cd "$(dirname "$(readlink -f "$0")")" || exit 1

sudo docker pull zhengkai/memoria:latest

ENV_FILE="./env-publish.sh"
if [ ! -e "$ENV_FILE" ]; then
	cp env.sh.example "$ENV_FILE"
	mkdir -p static
	echo "export MEMORIA_DIR=\"$(pwd)/static\"" >> "$ENV_FILE"
fi
. "$ENV_FILE"

sudo docker stop "$DOCKER_NAME" || :
sudo docker rm "$DOCKER_NAME" || :

set -x
sudo docker run -d --name "$DOCKER_NAME" \
	--env "MEMORIA_ROLE=publish" \
	-p "${MEMORIA_WEB}:80" \
	--mount "type=bind,source=${MEMORIA_DIR},target=/static" \
	--restart always \
	zhengkai/memoria:latest
