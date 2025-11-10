DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM pg_namespace WHERE nspname = 'backoffice') THEN
        CREATE SCHEMA backoffice;
    END IF;

    IF NOT EXISTS(SELECT 1 FROM pg_namespace WHERE nspname = 'communication') THEN
        CREATE SCHEMA communication;
    END IF;
END $EF$;