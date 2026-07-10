#! /usr/bin/env bash

# 11	*/3 	* * * /www/memoria/db/backup-tanya.sh >/dev/null 2>&1

DIR="/backup/tanya/memoria"

HOST="${HOSTNAME,,}"

if [ "$HOST" != 'tanya' ]; then
	>&2 echo "not tanya, exit"
	exit 1
fi

cd "$(dirname "$(readlink -f "$0")")" || exit 1

if [ ! -d "$DIR" ]; then
	DIR="backup"
	mkdir -p "$DIR"
fi

./dump.sh "$DIR"
