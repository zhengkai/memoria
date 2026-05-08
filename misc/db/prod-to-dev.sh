#! /usr/bin/env bash

set -euo pipefail

src="alice"
dst="dev_alice"

read charset collation < <(
  mysql -Nse "select default_character_set_name, default_collation_name
              from information_schema.schemata
              where schema_name='$src'"
)

set -x
mysql -e "drop database if exists \`$dst\`;
          create database \`$dst\`
          default charset $charset
          collate $collation;"

mysqldump \
  --lock-tables \
  --routines \
  --triggers \
  --events \
  --hex-blob \
  --set-gtid-purged=OFF \
  "$src" | mysql "$dst"
