DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

CREATE DOMAIN sha256 AS bytea CHECK (octet_length(VALUE) = 32);
CREATE DOMAIN created_at AS timestamptz DEFAULT now() NOT NULL;

CREATE TABLE public.file (
	file_id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY CHECK (file_id > 0),
    hash sha256 NOT NULL UNIQUE,
    data bytea NOT NULL,
    name text NOT NULL,
    ext text NOT NULL,
    time_create timestamp with time zone DEFAULT now() NOT NULL
);
ALTER TABLE public.file ALTER COLUMN data SET STORAGE EXTERNAL;

CREATE TABLE public.export_time (
	export_id bigint NOT NULL PRIMARY KEY,
    time timestamp with time zone NOT NULL
);

CREATE TABLE public.revision (
	revision_id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY CHECK (revision_id > 0),
    hash sha256 NOT NULL UNIQUE,
    data bytea NOT NULL,
    time_create timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE public.item (
	item_id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY CHECK (item_id > 0),
	meta_id bigint NOT NULL REFERENCES public.revision(revision_id),
	content_id bigint NOT NULL REFERENCES public.revision(revision_id),
    time_meta created_at,
    time_content created_at,
    time_create created_at
);

CREATE TABLE public.edit_history (
	history_id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY CHECK (history_id > 0),
	item_id bigint NOT NULL REFERENCES public.item(item_id),
	meta_id bigint NOT NULL REFERENCES public.revision(revision_id),
	content_id bigint NOT NULL REFERENCES public.revision(revision_id),
    time_create created_at
);

CREATE INDEX idx_edit_history_id_desc ON public.edit_history (item_id, history_id DESC);
