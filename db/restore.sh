#! /usr/bin/env bash

cd "$(dirname "$(readlink -f "$0")")" || exit 1

FILE="$1"
if [ -z "$FILE" ]; then
	TZ="Asia/Shanghai"
	DATE="$(date "+%Y-%m-%d")"
	FILE="db-memoria-${DATE}.dump"
fi

set -x

# 删除已有库（包括需要断掉连接），重新创建新的
sudo -u postgres psql -d postgres \
	-f ./empty-database.sql

PGPASSWORD=memoria pg_restore \
	-h 127.0.0.1 \
	-p 5432 \
	-U memoria \
	-d memoria \
	--no-owner \
	--no-acl \
	--exit-on-error \
	--verbose \
	"$FILE"

# 让用户 anna 也能读库
sudo -u postgres psql -d postgres \
	-f ./anna.sql
