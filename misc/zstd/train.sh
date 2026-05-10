#! /usr/bin/env bash

cd "$(dirname "$(readlink -f "$0")")" || exit 1
cd ../../static || exit 1

find page -type f \( -name "*.html" -o -name "*.css" \) > list.txt

rm -f dict.zstd
# zstd --train-cover=k=1024,d=8,steps=32 --filelist=list.txt -o dict.zstd
zstd --train-cover=steps=1024 --filelist=list.txt -o dict.zstd
