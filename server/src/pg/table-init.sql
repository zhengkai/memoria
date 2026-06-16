CREATE TABLE IF NOT EXISTS public.file (
	file_id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    hash bytea NOT NULL UNIQUE,
    data bytea NOT NULL,
    name text NOT NULL,
    ext text NOT NULL,
    ts_create timestamp with time zone DEFAULT now() NOT NULL
);

ALTER TABLE public.file ALTER COLUMN data SET STORAGE EXTERNAL;
