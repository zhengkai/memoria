#! /usr/bin/env bash

TZ="Asia/Shanghai"
DATE="$(date "+%Y-%m-%d")"

DIR="${1%/}"
if [ -n "$DIR" ]; then
	if [ ! -d "$DIR" ]; then
		>&2 echo "no dir $DIR"
		exit 1
	fi
	if [ ! -w "$DIR" ]; then
		>&2 echo "no write permission for dir $DIR"
		exit 1
	fi
	DIR="${DIR}/"
fi

FILE="${DIR}db-memoria-${DATE}.dump"
if [ -e "$FILE" ]; then
	>&2 echo "file $FILE already exists"
	exit 1
fi

cd "$(dirname "$(readlink -f "$0")")" || exit 1

export PGHOST=localhost
export PGDATABASE=memoria
export PGUSER=memoria
export PGPASSWORD=memoria

set -x
pg_dump -Fc -Z 9 \
	--no-owner --no-acl \
	-d memoria \
	-f "$FILE"
