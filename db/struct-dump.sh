#! /usr/bin/env bash

pg_dump -Fc -Z 9 \
	-d memoria \
	--schema-only \
	--no-owner \
	-f schema.dump
