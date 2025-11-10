ALTER TABLE "ecommerce"."user" ADD COLUMN IF NOT EXISTS "two_factor_secret" character varying(100);
ALTER TABLE "ecommerce"."user" ADD COLUMN IF NOT EXISTS "two_factor_enabled" boolean NOT NULL DEFAULT false;
ALTER TABLE "ecommerce"."user" ADD COLUMN IF NOT EXISTS "recovery_code" character varying;