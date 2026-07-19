#! /usr/bin/env bash

set -e

TARGET="doll:/www/memoria/static"

# 将 tanya 上的正式数据同步到 doll 上
#
# 应该 crontab 每分钟执行

cd "$(dirname "$(dirname "$(readlink -f "$0")")")/static"

LOCKFILE=".$(basename "$0").lock"
exec 200>"$LOCKFILE"
flock -n 200

RSYNC_TIME_FILE="rsync-time.txt"
EXPORT_TIME_FILE="data-v2/export-time.txt"

PREV="$(cat "$RSYNC_TIME_FILE" 2>/dev/null || echo 0)"
TS="$(cat "$EXPORT_TIME_FILE" 2>/dev/null || echo 0)"
if [[ "x$TS" == "$PREV" ]]; then
	exit
fi

set -x
rsync --partial -vzrtopg --delete --xattrs --exclude="$EXPORT_TIME_FILE" ./data-v2 ./file "$TARGET"
rsync --partial -vzrtopg "$EXPORT_TIME_FILE" "${TARGET}/${EXPORT_TIME_FILE}"

echo "$TS" > "$RSYNC_TIME_FILE"
