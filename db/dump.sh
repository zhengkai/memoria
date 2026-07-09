#! /usr/bin/env bash

pg_dump -Fc -Z 9 \
	-d memoria \
	-f memoria.dump
