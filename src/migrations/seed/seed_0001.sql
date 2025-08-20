DO
$$
    DECLARE v_user_id uuid;
BEGIN
    v_user_id := gen_random_uuid();
    INSERT INTO ecommerce."department" ("id", "name", "created_by", "created_at", "updated_by", "updated_at", "deleted_at", "deleted_by") VALUES (1, 'Default', 'Admin', now(), null, now(), null, null) ON CONFLICT DO NOTHING;
    INSERT INTO ecommerce."role" ("id", "name", "description", "created_by", "created_at", "updated_by", "updated_at", "deleted_at", "deleted_by")VALUES (1, 'Supper Admin', null, 'Admin', now(), null, now(), null, null) ON CONFLICT DO NOTHING;
    INSERT INTO ecommerce."user" ("id", "department_id", "first_name", "last_name", "user_name", "email", "password", "status", "is_system_user", "is_confirmed", "provider", "created_by", "created_at", "updated_by", "updated_at", "deleted_at", "deleted_by") VALUES (v_user_id, 1, 'adminroot', 'adminroot', 'adminroot', 'adminroot@gmail.com', '$2b$10$IaQtHAlqfh3WcaKtd1PugueO6qMx1vQOZJeblmv3kZIlzPOOnHysO', 1, true, true, 1, 'Admin', now(), null, now(), null, null) ON CONFLICT DO NOTHING;
    INSERT INTO ecommerce.user_role ("user_id", "role_id") VALUES (v_user_id, 1) ON CONFLICT DO NOTHING;
END
$$;
