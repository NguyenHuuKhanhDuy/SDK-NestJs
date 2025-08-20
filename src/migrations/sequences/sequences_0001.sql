DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM pg_namespace WHERE nspname = 'ecommerce') THEN
CREATE SCHEMA ecommerce;
END IF;
END $EF$;