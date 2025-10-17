DO
$$
    DECLARE
        v_user_id uuid;
        v_role_id int;
    BEGIN
        v_user_id := gen_random_uuid();

        INSERT INTO ecommerce."department" ("id", "name", "created_by", "created_at", "updated_by", "updated_at")
        VALUES (1, 'Default', 'Admin', now(), null, now())
            ON CONFLICT DO NOTHING;

        SELECT id INTO v_role_id FROM ecommerce."role" WHERE "name" = 'Super Admin' LIMIT 1;

        IF v_role_id IS NULL THEN
                    INSERT INTO ecommerce."role" ("name", "description", "type", "created_by", "created_at", "updated_by", "updated_at")
                    VALUES ('Super Admin', null, 1, 'Admin', now(), null, now())
                    RETURNING id INTO v_role_id;
        END IF;

        INSERT INTO ecommerce."role" ("name", "description", "type", "created_by", "created_at", "updated_by", "updated_at")
        VALUES ('User', null, 3, 'Admin', now(), null, now());

        INSERT INTO ecommerce."user" ("id", "department_id", "first_name", "last_name", "user_name", "email",
                                      "password",
                                      "status", "is_system_user", "is_confirmed", "provider",
                                      "created_by", "created_at", "updated_by", "updated_at")
        VALUES (v_user_id,
                1,
                'adminroot',
                'adminroot',
                'adminroot',
                'adminroot@gmail.com',
                '$2b$10$IaQtHAlqfh3WcaKtd1PugueO6qMx1vQOZJeblmv3kZIlzPOOnHysO',
                1,
                true,
                true,
                1,
                'Admin',
                now(),
                null,
                now())
            ON CONFLICT ("email") DO NOTHING;

        INSERT INTO ecommerce."user_role" ("user_id", "role_id")
        VALUES (v_user_id, v_role_id)
            ON CONFLICT DO NOTHING;
    END
$$;
