SHELL:=/usr/bin/env bash

reset:
	psql < ./table-init.sql

migrate:
	curl localhost:22709/api/migrate
