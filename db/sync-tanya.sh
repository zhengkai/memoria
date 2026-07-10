#! /usr/bin/env bash

# 从 tanya 获取最新的备份文件，从本地恢复

SRC_HOST="tanya"

HOST="${HOSTNAME,,}"
if [ "$HOST" == "$SRC_HOST" ]; then
	>&2 echo "not in ${SRC_HOST}, exit"
	exit 1
fi

set -e

REMOTE_DIR="/backup/${SRC_HOST}/memoria"

# shellcheck disable=SC2029
LATEST=$(ssh "$SRC_HOST" "find '${REMOTE_DIR}' -maxdepth 1 -type f -name '*.dump' -printf '%T@ %f\n' | sort -nr | head -1 | cut -d' ' -f2-")

LOCAL="/tmp/$(basename "$LATEST")"

set -x

scp "${SRC_HOST}:${REMOTE_DIR}/$LATEST" "$LOCAL"

./restore.sh "$LOCAL"
