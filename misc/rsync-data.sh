#! /usr/bin/env bash

# 将 tanya 上的正式数据同步到 doll 上
#
# 应该 crontab 每分钟执行

cd "$(dirname "$(readlink -f "$0")")" || exit 1
cd ../static || exit 1

LOCKFILE=".$(basename "$0").lock"
exec 200>"$LOCKFILE"
flock -n 200 || exit 1

RSYNC_TIME_FILE="rsync-time.txt"

PREV="$(cat "$RSYNC_TIME_FILE" 2>/dev/null || echo 0)"

TS="$(cat export-time.txt 2>/dev/null || echo 0)"

if [[ "$TS" == "$PREV" ]]; then
	exit
fi

rsync --partial -vzrtopg --delete ./data ./file doll:/www/memoria || exit 1

echo "$TS" > "$RSYNC_TIME_FILE"
