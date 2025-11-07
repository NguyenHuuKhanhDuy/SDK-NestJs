DO
$$
    DECLARE
        v_user_id uuid;
        v_role_id int;
    BEGIN
        v_user_id := gen_random_uuid();

                -- Seed default department
        INSERT INTO ecommerce."department" ("id", "name", "created_by", "created_at", "updated_by", "updated_at")
        VALUES (1, 'Default', 'Admin', now(), null, now())
            ON CONFLICT DO NOTHING;

        SELECT id INTO v_role_id FROM ecommerce."role" WHERE "type" = 1 LIMIT 1;

        IF v_role_id IS NULL THEN
                            INSERT INTO ecommerce."role" ("name", "description", "type", "created_by", "created_at", "updated_by", "updated_at")
                            VALUES ('Super Admin', null, 1, 'Admin', now(), null, now())
                            RETURNING id INTO v_role_id;
        END IF;

                -- Seed default roles
        INSERT INTO ecommerce."role" ("name", "description", "type", "created_by", "created_at", "updated_by", "updated_at")
        VALUES ('User', null, 3, 'Admin', now(), null, now());

        -- Seed default admin user
        INSERT INTO ecommerce."user" ("id", "department_id", "first_name", "last_name", "user_name", "email",
                                      "password",
                                      "status", "is_system_user", "is_confirmed", "provider", "country_id", role_id,
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
                null,
                v_role_id,
                'Admin',
                now(),
                null,
                now())
            ON CONFLICT ("email") DO NOTHING;

        -- Seed countries
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (1, 'Afghanistan', 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_the_Taliban.svg', '93', 'AF', 'AFG');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (2, 'Åland Islands', 'https://flagcdn.com/ax.svg', '358', 'AX', 'ALA');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (3, 'Albania', 'https://flagcdn.com/al.svg', '355', 'AL', 'ALB');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (4, 'Algeria', 'https://flagcdn.com/dz.svg', '213', 'DZ', 'DZA');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (5, 'American Samoa', 'https://flagcdn.com/as.svg', '1', 'AS', 'ASM');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (6, 'Andorra', 'https://flagcdn.com/ad.svg', '376', 'AD', 'AND');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (7, 'Angola', 'https://flagcdn.com/ao.svg', '244', 'AO', 'AGO');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (8, 'Anguilla', 'https://flagcdn.com/ai.svg', '1', 'AI', 'AIA');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (9, 'Antarctica', 'https://flagcdn.com/aq.svg', '672', 'AQ', 'ATA');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (10, 'Antigua and Barbuda', 'https://flagcdn.com/ag.svg', '1', 'AG', 'ATG');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (11, 'Argentina', 'https://flagcdn.com/ar.svg', '54', 'AR', 'ARG');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (12, 'Armenia', 'https://flagcdn.com/am.svg', '374', 'AM', 'ARM');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (13, 'Aruba', 'https://flagcdn.com/aw.svg', '297', 'AW', 'ABW');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (14, 'Australia', 'https://flagcdn.com/au.svg', '61', 'AU', 'AUS');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (15, 'Austria', 'https://flagcdn.com/at.svg', '43', 'AT', 'AUT');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (16, 'Azerbaijan', 'https://flagcdn.com/az.svg', '994', 'AZ', 'AZE');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (17, 'Bahamas', 'https://flagcdn.com/bs.svg', '1', 'BS', 'BHS');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (18, 'Bahrain', 'https://flagcdn.com/bh.svg', '973', 'BH', 'BHR');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (19, 'Bangladesh', 'https://flagcdn.com/bd.svg', '880', 'BD', 'BGD');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (20, 'Barbados', 'https://flagcdn.com/bb.svg', '1', 'BB', 'BRB');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (21, 'Belarus', 'https://flagcdn.com/by.svg', '375', 'BY', 'BLR');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (22, 'Belgium', 'https://flagcdn.com/be.svg', '32', 'BE', 'BEL');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (23, 'Belize', 'https://flagcdn.com/bz.svg', '501', 'BZ', 'BLZ');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (24, 'Benin', 'https://flagcdn.com/bj.svg', '229', 'BJ', 'BEN');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (25, 'Bermuda', 'https://flagcdn.com/bm.svg', '1', 'BM', 'BMU');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (26, 'Bhutan', 'https://flagcdn.com/bt.svg', '975', 'BT', 'BTN');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (27, 'Bolivia (Plurinational State of)', 'https://flagcdn.com/bo.svg', '591', 'BO', 'BOL');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (28, 'Bonaire, Sint Eustatius and Saba', 'https://flagcdn.com/bq.svg', '599', 'BQ', 'BES');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (29, 'Bosnia and Herzegovina', 'https://flagcdn.com/ba.svg', '387', 'BA', 'BIH');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (30, 'Botswana', 'https://flagcdn.com/bw.svg', '267', 'BW', 'BWA');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (31, 'Bouvet Island', 'https://flagcdn.com/bv.svg', '47', 'BV', 'BVT');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (32, 'Brazil', 'https://flagcdn.com/br.svg', '55', 'BR', 'BRA');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (33, 'British Indian Ocean Territory', 'https://flagcdn.com/io.svg', '246', 'IO', 'IOT');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (34, 'United States Minor Outlying Islands', 'https://flagcdn.com/um.svg', '246', 'UM', 'UMI');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (35, 'Virgin Islands (British)', 'https://flagcdn.com/vg.svg', '1', 'VG', 'VGB');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (36, 'Virgin Islands (U.S.)', 'https://flagcdn.com/vi.svg', '1 340', 'VI', 'VIR');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (37, 'Brunei Darussalam', 'https://flagcdn.com/bn.svg', '673', 'BN', 'BRN');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (38, 'Bulgaria', 'https://flagcdn.com/bg.svg', '359', 'BG', 'BGR');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (39, 'Burkina Faso', 'https://flagcdn.com/bf.svg', '226', 'BF', 'BFA');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (40, 'Burundi', 'https://flagcdn.com/bi.svg', '257', 'BI', 'BDI');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (41, 'Cambodia', 'https://flagcdn.com/kh.svg', '855', 'KH', 'KHM');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (42, 'Cameroon', 'https://flagcdn.com/cm.svg', '237', 'CM', 'CMR');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (43, 'Canada', 'https://flagcdn.com/ca.svg', '1', 'CA', 'CAN');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (44, 'Cabo Verde', 'https://flagcdn.com/cv.svg', '238', 'CV', 'CPV');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (45, 'Cayman Islands', 'https://flagcdn.com/ky.svg', '1', 'KY', 'CYM');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (46, 'Central African Republic', 'https://flagcdn.com/cf.svg', '236', 'CF', 'CAF');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (47, 'Chad', 'https://flagcdn.com/td.svg', '235', 'TD', 'TCD');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (48, 'Chile', 'https://flagcdn.com/cl.svg', '56', 'CL', 'CHL');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (49, 'China', 'https://flagcdn.com/cn.svg', '86', 'CN', 'CHN');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (50, 'Christmas Island', 'https://flagcdn.com/cx.svg', '61', 'CX', 'CXR');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (51, 'Cocos (Keeling) Islands', 'https://flagcdn.com/cc.svg', '61', 'CC', 'CCK');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (52, 'Colombia', 'https://flagcdn.com/co.svg', '57', 'CO', 'COL');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (53, 'Comoros', 'https://flagcdn.com/km.svg', '269', 'KM', 'COM');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (54, 'Congo', 'https://flagcdn.com/cg.svg', '242', 'CG', 'COG');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (55, 'Congo (Democratic Republic of the)', 'https://flagcdn.com/cd.svg', '243', 'CD', 'COD');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (56, 'Cook Islands', 'https://flagcdn.com/ck.svg', '682', 'CK', 'COK');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (57, 'Costa Rica', 'https://flagcdn.com/cr.svg', '506', 'CR', 'CRI');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (58, 'Croatia', 'https://flagcdn.com/hr.svg', '385', 'HR', 'HRV');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (59, 'Cuba', 'https://flagcdn.com/cu.svg', '53', 'CU', 'CUB');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (60, 'Curaçao', 'https://flagcdn.com/cw.svg', '599', 'CW', 'CUW');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (61, 'Cyprus', 'https://flagcdn.com/cy.svg', '357', 'CY', 'CYP');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (62, 'Czech Republic', 'https://flagcdn.com/cz.svg', '420', 'CZ', 'CZE');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (63, 'Denmark', 'https://flagcdn.com/dk.svg', '45', 'DK', 'DNK');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (64, 'Djibouti', 'https://flagcdn.com/dj.svg', '253', 'DJ', 'DJI');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (65, 'Dominica', 'https://flagcdn.com/dm.svg', '1', 'DM', 'DMA');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (66, 'Dominican Republic', 'https://flagcdn.com/do.svg', '1', 'DO', 'DOM');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (67, 'Ecuador', 'https://flagcdn.com/ec.svg', '593', 'EC', 'ECU');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (68, 'Egypt', 'https://flagcdn.com/eg.svg', '20', 'EG', 'EGY');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (69, 'El Salvador', 'https://flagcdn.com/sv.svg', '503', 'SV', 'SLV');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (70, 'Equatorial Guinea', 'https://flagcdn.com/gq.svg', '240', 'GQ', 'GNQ');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (71, 'Eritrea', 'https://flagcdn.com/er.svg', '291', 'ER', 'ERI');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (72, 'Estonia', 'https://flagcdn.com/ee.svg', '372', 'EE', 'EST');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (73, 'Ethiopia', 'https://flagcdn.com/et.svg', '251', 'ET', 'ETH');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (74, 'Falkland Islands (Malvinas)', 'https://flagcdn.com/fk.svg', '500', 'FK', 'FLK');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (75, 'Faroe Islands', 'https://flagcdn.com/fo.svg', '298', 'FO', 'FRO');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (76, 'Fiji', 'https://flagcdn.com/fj.svg', '679', 'FJ', 'FJI');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (77, 'Finland', 'https://flagcdn.com/fi.svg', '358', 'FI', 'FIN');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (78, 'France', 'https://flagcdn.com/fr.svg', '33', 'FR', 'FRA');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (79, 'French Guiana', 'https://flagcdn.com/gf.svg', '594', 'GF', 'GUF');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (80, 'French Polynesia', 'https://flagcdn.com/pf.svg', '689', 'PF', 'PYF');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (81, 'French Southern Territories', 'https://flagcdn.com/tf.svg', '262', 'TF', 'ATF');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (82, 'Gabon', 'https://flagcdn.com/ga.svg', '241', 'GA', 'GAB');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (83, 'Gambia', 'https://flagcdn.com/gm.svg', '220', 'GM', 'GMB');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (84, 'Georgia', 'https://flagcdn.com/ge.svg', '995', 'GE', 'GEO');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (85, 'Germany', 'https://flagcdn.com/de.svg', '49', 'DE', 'DEU');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (86, 'Ghana', 'https://flagcdn.com/gh.svg', '233', 'GH', 'GHA');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (87, 'Gibraltar', 'https://flagcdn.com/gi.svg', '350', 'GI', 'GIB');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (88, 'Greece', 'https://flagcdn.com/gr.svg', '30', 'GR', 'GRC');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (89, 'Greenland', 'https://flagcdn.com/gl.svg', '299', 'GL', 'GRL');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (90, 'Grenada', 'https://flagcdn.com/gd.svg', '1', 'GD', 'GRD');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (91, 'Guadeloupe', 'https://flagcdn.com/gp.svg', '590', 'GP', 'GLP');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (92, 'Guam', 'https://flagcdn.com/gu.svg', '1', 'GU', 'GUM');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (93, 'Guatemala', 'https://flagcdn.com/gt.svg', '502', 'GT', 'GTM');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (94, 'Guernsey', 'https://flagcdn.com/gg.svg', '44', 'GG', 'GGY');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (95, 'Guinea', 'https://flagcdn.com/gn.svg', '224', 'GN', 'GIN');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (96, 'Guinea-Bissau', 'https://flagcdn.com/gw.svg', '245', 'GW', 'GNB');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (97, 'Guyana', 'https://flagcdn.com/gy.svg', '592', 'GY', 'GUY');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (98, 'Haiti', 'https://flagcdn.com/ht.svg', '509', 'HT', 'HTI');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (99, 'Heard Island and McDonald Islands', 'https://flagcdn.com/hm.svg', '672', 'HM', 'HMD');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (100, 'Vatican City', 'https://flagcdn.com/va.svg', '379', 'VA', 'VAT');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (101, 'Honduras', 'https://flagcdn.com/hn.svg', '504', 'HN', 'HND');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (102, 'Hungary', 'https://flagcdn.com/hu.svg', '36', 'HU', 'HUN');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (103, 'Hong Kong', 'https://flagcdn.com/hk.svg', '852', 'HK', 'HKG');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (104, 'Iceland', 'https://flagcdn.com/is.svg', '354', 'IS', 'ISL');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (105, 'India', 'https://flagcdn.com/in.svg', '91', 'IN', 'IND');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (106, 'Indonesia', 'https://flagcdn.com/id.svg', '62', 'ID', 'IDN');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (107, 'Ivory Coast', 'https://flagcdn.com/ci.svg', '225', 'CI', 'CIV');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (108, 'Iran (Islamic Republic of)', 'https://flagcdn.com/ir.svg', '98', 'IR', 'IRN');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (109, 'Iraq', 'https://flagcdn.com/iq.svg', '964', 'IQ', 'IRQ');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (110, 'Ireland', 'https://flagcdn.com/ie.svg', '353', 'IE', 'IRL');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (111, 'Isle of Man', 'https://flagcdn.com/im.svg', '44', 'IM', 'IMN');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (112, 'Israel', 'https://flagcdn.com/il.svg', '972', 'IL', 'ISR');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (113, 'Italy', 'https://flagcdn.com/it.svg', '39', 'IT', 'ITA');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (114, 'Jamaica', 'https://flagcdn.com/jm.svg', '1', 'JM', 'JAM');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (115, 'Japan', 'https://flagcdn.com/jp.svg', '81', 'JP', 'JPN');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (116, 'Jersey', 'https://flagcdn.com/je.svg', '44', 'JE', 'JEY');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (117, 'Jordan', 'https://flagcdn.com/jo.svg', '962', 'JO', 'JOR');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (118, 'Kazakhstan', 'https://flagcdn.com/kz.svg', '76', 'KZ', 'KAZ');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (119, 'Kenya', 'https://flagcdn.com/ke.svg', '254', 'KE', 'KEN');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (120, 'Kiribati', 'https://flagcdn.com/ki.svg', '686', 'KI', 'KIR');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (121, 'Kuwait', 'https://flagcdn.com/kw.svg', '965', 'KW', 'KWT');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (122, 'Kyrgyzstan', 'https://flagcdn.com/kg.svg', '996', 'KG', 'KGZ');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (123, 'Lao People''s Democratic Republic', 'https://flagcdn.com/la.svg', '856', 'LA', 'LAO');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (124, 'Latvia', 'https://flagcdn.com/lv.svg', '371', 'LV', 'LVA');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (125, 'Lebanon', 'https://flagcdn.com/lb.svg', '961', 'LB', 'LBN');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (126, 'Lesotho', 'https://flagcdn.com/ls.svg', '266', 'LS', 'LSO');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (127, 'Liberia', 'https://flagcdn.com/lr.svg', '231', 'LR', 'LBR');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (128, 'Libya', 'https://flagcdn.com/ly.svg', '218', 'LY', 'LBY');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (129, 'Liechtenstein', 'https://flagcdn.com/li.svg', '423', 'LI', 'LIE');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (130, 'Lithuania', 'https://flagcdn.com/lt.svg', '370', 'LT', 'LTU');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (131, 'Luxembourg', 'https://flagcdn.com/lu.svg', '352', 'LU', 'LUX');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (132, 'Macao', 'https://flagcdn.com/mo.svg', '853', 'MO', 'MAC');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (133, 'North Macedonia', 'https://flagcdn.com/mk.svg', '389', 'MK', 'MKD');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (134, 'Madagascar', 'https://flagcdn.com/mg.svg', '261', 'MG', 'MDG');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (135, 'Malawi', 'https://flagcdn.com/mw.svg', '265', 'MW', 'MWI');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (136, 'Malaysia', 'https://flagcdn.com/my.svg', '60', 'MY', 'MYS');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (137, 'Maldives', 'https://flagcdn.com/mv.svg', '960', 'MV', 'MDV');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (138, 'Mali', 'https://flagcdn.com/ml.svg', '223', 'ML', 'MLI');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (139, 'Malta', 'https://flagcdn.com/mt.svg', '356', 'MT', 'MLT');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (140, 'Marshall Islands', 'https://flagcdn.com/mh.svg', '692', 'MH', 'MHL');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (141, 'Martinique', 'https://flagcdn.com/mq.svg', '596', 'MQ', 'MTQ');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (142, 'Mauritania', 'https://flagcdn.com/mr.svg', '222', 'MR', 'MRT');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (143, 'Mauritius', 'https://flagcdn.com/mu.svg', '230', 'MU', 'MUS');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (144, 'Mayotte', 'https://flagcdn.com/yt.svg', '262', 'YT', 'MYT');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (145, 'Mexico', 'https://flagcdn.com/mx.svg', '52', 'MX', 'MEX');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (146, 'Micronesia (Federated States of)', 'https://flagcdn.com/fm.svg', '691', 'FM', 'FSM');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (147, 'Moldova (Republic of)', 'https://flagcdn.com/md.svg', '373', 'MD', 'MDA');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (148, 'Monaco', 'https://flagcdn.com/mc.svg', '377', 'MC', 'MCO');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (149, 'Mongolia', 'https://flagcdn.com/mn.svg', '976', 'MN', 'MNG');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (150, 'Montenegro', 'https://flagcdn.com/me.svg', '382', 'ME', 'MNE');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (151, 'Montserrat', 'https://flagcdn.com/ms.svg', '1', 'MS', 'MSR');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (152, 'Morocco', 'https://flagcdn.com/ma.svg', '212', 'MA', 'MAR');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (153, 'Mozambique', 'https://flagcdn.com/mz.svg', '258', 'MZ', 'MOZ');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (154, 'Myanmar', 'https://flagcdn.com/mm.svg', '95', 'MM', 'MMR');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (155, 'Namibia', 'https://flagcdn.com/na.svg', '264', 'NA', 'NAM');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (156, 'Nauru', 'https://flagcdn.com/nr.svg', '674', 'NR', 'NRU');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (157, 'Nepal', 'https://flagcdn.com/np.svg', '977', 'NP', 'NPL');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (158, 'Netherlands', 'https://flagcdn.com/nl.svg', '31', 'NL', 'NLD');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (159, 'New Caledonia', 'https://flagcdn.com/nc.svg', '687', 'NC', 'NCL');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (160, 'New Zealand', 'https://flagcdn.com/nz.svg', '64', 'NZ', 'NZL');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (161, 'Nicaragua', 'https://flagcdn.com/ni.svg', '505', 'NI', 'NIC');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (162, 'Niger', 'https://flagcdn.com/ne.svg', '227', 'NE', 'NER');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (163, 'Nigeria', 'https://flagcdn.com/ng.svg', '234', 'NG', 'NGA');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (164, 'Niue', 'https://flagcdn.com/nu.svg', '683', 'NU', 'NIU');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (165, 'Norfolk Island', 'https://flagcdn.com/nf.svg', '672', 'NF', 'NFK');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (166, 'Korea (Democratic People''s Republic of)', 'https://flagcdn.com/kp.svg', '850', 'KP', 'PRK');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (167, 'Northern Mariana Islands', 'https://flagcdn.com/mp.svg', '1', 'MP', 'MNP');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (168, 'Norway', 'https://flagcdn.com/no.svg', '47', 'NO', 'NOR');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (169, 'Oman', 'https://flagcdn.com/om.svg', '968', 'OM', 'OMN');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (170, 'Pakistan', 'https://flagcdn.com/pk.svg', '92', 'PK', 'PAK');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (171, 'Palau', 'https://flagcdn.com/pw.svg', '680', 'PW', 'PLW');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (172, 'Palestine, State of', 'https://flagcdn.com/ps.svg', '970', 'PS', 'PSE');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (173, 'Panama', 'https://flagcdn.com/pa.svg', '507', 'PA', 'PAN');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (174, 'Papua New Guinea', 'https://flagcdn.com/pg.svg', '675', 'PG', 'PNG');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (175, 'Paraguay', 'https://flagcdn.com/py.svg', '595', 'PY', 'PRY');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (176, 'Peru', 'https://flagcdn.com/pe.svg', '51', 'PE', 'PER');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (177, 'Philippines', 'https://flagcdn.com/ph.svg', '63', 'PH', 'PHL');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (178, 'Pitcairn', 'https://flagcdn.com/pn.svg', '64', 'PN', 'PCN');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (179, 'Poland', 'https://flagcdn.com/pl.svg', '48', 'PL', 'POL');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (180, 'Portugal', 'https://flagcdn.com/pt.svg', '351', 'PT', 'PRT');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (181, 'Puerto Rico', 'https://flagcdn.com/pr.svg', '1', 'PR', 'PRI');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (182, 'Qatar', 'https://flagcdn.com/qa.svg', '974', 'QA', 'QAT');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (183, 'Republic of Kosovo', 'https://flagcdn.com/xk.svg', '383', 'XK', 'UNK');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (184, 'Réunion', 'https://flagcdn.com/re.svg', '262', 'RE', 'REU');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (185, 'Romania', 'https://flagcdn.com/ro.svg', '40', 'RO', 'ROU');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (186, 'Russian Federation', 'https://flagcdn.com/ru.svg', '7', 'RU', 'RUS');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (187, 'Rwanda', 'https://flagcdn.com/rw.svg', '250', 'RW', 'RWA');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (188, 'Saint Barthélemy', 'https://flagcdn.com/bl.svg', '590', 'BL', 'BLM');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (189, 'Saint Helena, Ascension and Tristan da Cunha', 'https://flagcdn.com/sh.svg', '290', 'SH', 'SHN');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (190, 'Saint Kitts and Nevis', 'https://flagcdn.com/kn.svg', '1', 'KN', 'KNA');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (191, 'Saint Lucia', 'https://flagcdn.com/lc.svg', '1', 'LC', 'LCA');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (192, 'Saint Martin (French part)', 'https://flagcdn.com/mf.svg', '590', 'MF', 'MAF');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (193, 'Saint Pierre and Miquelon', 'https://flagcdn.com/pm.svg', '508', 'PM', 'SPM');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (194, 'Saint Vincent and the Grenadines', 'https://flagcdn.com/vc.svg', '1', 'VC', 'VCT');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (195, 'Samoa', 'https://flagcdn.com/ws.svg', '685', 'WS', 'WSM');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (196, 'San Marino', 'https://flagcdn.com/sm.svg', '378', 'SM', 'SMR');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (197, 'Sao Tome and Principe', 'https://flagcdn.com/st.svg', '239', 'ST', 'STP');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (198, 'Saudi Arabia', 'https://flagcdn.com/sa.svg', '966', 'SA', 'SAU');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (199, 'Senegal', 'https://flagcdn.com/sn.svg', '221', 'SN', 'SEN');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (200, 'Serbia', 'https://flagcdn.com/rs.svg', '381', 'RS', 'SRB');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (201, 'Seychelles', 'https://flagcdn.com/sc.svg', '248', 'SC', 'SYC');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (202, 'Sierra Leone', 'https://flagcdn.com/sl.svg', '232', 'SL', 'SLE');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (203, 'Singapore', 'https://flagcdn.com/sg.svg', '65', 'SG', 'SGP');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (204, 'Sint Maarten (Dutch part)', 'https://flagcdn.com/sx.svg', '1', 'SX', 'SXM');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (205, 'Slovakia', 'https://flagcdn.com/sk.svg', '421', 'SK', 'SVK');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (206, 'Slovenia', 'https://flagcdn.com/si.svg', '386', 'SI', 'SVN');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (207, 'Solomon Islands', 'https://flagcdn.com/sb.svg', '677', 'SB', 'SLB');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (208, 'Somalia', 'https://flagcdn.com/so.svg', '252', 'SO', 'SOM');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (209, 'South Africa', 'https://flagcdn.com/za.svg', '27', 'ZA', 'ZAF');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (210, 'South Georgia and the South Sandwich Islands', 'https://flagcdn.com/gs.svg', '500', 'GS', 'SGS');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (211, 'Korea (Republic of)', 'https://flagcdn.com/kr.svg', '82', 'KR', 'KOR');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (212, 'Spain', 'https://flagcdn.com/es.svg', '34', 'ES', 'ESP');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (213, 'Sri Lanka', 'https://flagcdn.com/lk.svg', '94', 'LK', 'LKA');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (214, 'Sudan', 'https://flagcdn.com/sd.svg', '249', 'SD', 'SDN');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (215, 'South Sudan', 'https://flagcdn.com/ss.svg', '211', 'SS', 'SSD');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (216, 'Suriname', 'https://flagcdn.com/sr.svg', '597', 'SR', 'SUR');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (217, 'Svalbard and Jan Mayen', 'https://flagcdn.com/sj.svg', '47', 'SJ', 'SJM');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (218, 'Swaziland', 'https://flagcdn.com/sz.svg', '268', 'SZ', 'SWZ');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (219, 'Sweden', 'https://flagcdn.com/se.svg', '46', 'SE', 'SWE');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (220, 'Switzerland', 'https://flagcdn.com/ch.svg', '41', 'CH', 'CHE');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (221, 'Syrian Arab Republic', 'https://flagcdn.com/sy.svg', '963', 'SY', 'SYR');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (222, 'Taiwan', 'https://flagcdn.com/tw.svg', '886', 'TW', 'TWN');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (223, 'Tajikistan', 'https://flagcdn.com/tj.svg', '992', 'TJ', 'TJK');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (224, 'Tanzania, United Republic of', 'https://flagcdn.com/tz.svg', '255', 'TZ', 'TZA');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (225, 'Thailand', 'https://flagcdn.com/th.svg', '66', 'TH', 'THA');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (226, 'Timor-Leste', 'https://flagcdn.com/tl.svg', '670', 'TL', 'TLS');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (227, 'Togo', 'https://flagcdn.com/tg.svg', '228', 'TG', 'TGO');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (228, 'Tokelau', 'https://flagcdn.com/tk.svg', '690', 'TK', 'TKL');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (229, 'Tonga', 'https://flagcdn.com/to.svg', '676', 'TO', 'TON');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (230, 'Trinidad and Tobago', 'https://flagcdn.com/tt.svg', '1', 'TT', 'TTO');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (231, 'Tunisia', 'https://flagcdn.com/tn.svg', '216', 'TN', 'TUN');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (232, 'Turkey', 'https://flagcdn.com/tr.svg', '90', 'TR', 'TUR');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (233, 'Turkmenistan', 'https://flagcdn.com/tm.svg', '993', 'TM', 'TKM');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (234, 'Turks and Caicos Islands', 'https://flagcdn.com/tc.svg', '1', 'TC', 'TCA');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (235, 'Tuvalu', 'https://flagcdn.com/tv.svg', '688', 'TV', 'TUV');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (236, 'Uganda', 'https://flagcdn.com/ug.svg', '256', 'UG', 'UGA');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (237, 'Ukraine', 'https://flagcdn.com/ua.svg', '380', 'UA', 'UKR');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (238, 'United Arab Emirates', 'https://flagcdn.com/ae.svg', '971', 'AE', 'ARE');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (239, 'United Kingdom of Great Britain and Northern Ireland', 'https://flagcdn.com/gb.svg', '44', 'GB', 'GBR');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (240, 'United States of America', 'https://flagcdn.com/us.svg', '1', 'US', 'USA');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (241, 'Uruguay', 'https://flagcdn.com/uy.svg', '598', 'UY', 'URY');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (242, 'Uzbekistan', 'https://flagcdn.com/uz.svg', '998', 'UZ', 'UZB');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (243, 'Vanuatu', 'https://flagcdn.com/vu.svg', '678', 'VU', 'VUT');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (244, 'Venezuela (Bolivarian Republic of)', 'https://flagcdn.com/ve.svg', '58', 'VE', 'VEN');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (245, 'Vietnam', 'https://flagcdn.com/vn.svg', '84', 'VN', 'VNM');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (246, 'Wallis and Futuna', 'https://flagcdn.com/wf.svg', '681', 'WF', 'WLF');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (247, 'Western Sahara', 'https://flagcdn.com/eh.svg', '212', 'EH', 'ESH');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (248, 'Yemen', 'https://flagcdn.com/ye.svg', '967', 'YE', 'YEM');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (249, 'Zambia', 'https://flagcdn.com/zm.svg', '260', 'ZM', 'ZMB');
        INSERT INTO ecommerce.country (id, name, flag_url, dial_code, alpha2_code, alpha3_code) VALUES (250, 'Zimbabwe', 'https://flagcdn.com/zw.svg', '263', 'ZW', 'ZWE');

        -- Seed email templates
        INSERT INTO communication.notification_setting (id, name, description, type, is_urgent, created_by, created_at, updated_by, updated_at, deleted_at, deleted_by) VALUES ('37f400c5-8bf4-4693-a95b-0c7dcaeb522f', 'email', 'Email', 1, false, 'Admin', now(), null, null, null, null) ON CONFLICT DO NOTHING ;
        INSERT INTO communication.notification_setting (id, name, description, type, is_urgent, created_by, created_at, updated_by, updated_at, deleted_at, deleted_by) VALUES ('df86d2f9-e67f-4ead-9911-fd19c67cc21b', 'sms', 'SMS', 2, false, 'Admin', now(), null, null, null, null) ON CONFLICT DO NOTHING ;
        INSERT INTO communication.notification_setting (id, name, description, type, is_urgent, created_by, created_at, updated_by, updated_at, deleted_at, deleted_by) VALUES ('6870e6c8-29ef-43c6-83eb-42353b723b10', 'inapp', 'InApp', 3, false, 'Admin', now(), null, null, null, null) ON CONFLICT DO NOTHING ;
        INSERT INTO communication.notification_template (id, type, code, description, notification_setting_id, email_sender, subject, list_of_recipient_types, content, is_latest_version, created_by, created_at, updated_by, updated_at, deleted_at, deleted_by) VALUES ('5718cfca-f5cf-466f-9dbf-058d4713fe99', 'System', 'E000001', 'Confirm Email', '37f400c5-8bf4-4693-a95b-0c7dcaeb522f', null, '{"languages": [{"name": "en-US", "value": "Just%20one%20step%20left%21%20Confirm%20your%20email%20%E2%9C%A8"}, {"name": "fr-FR", "value": ""}, {"name": "th-TH", "value": ""}, {"name": "vi-VN", "value": ""}, {"name": "km-KH", "value": ""}, {"name": "zh-CN", "value": ""}]}', null, '{"languages": [{"name": "en-US", "value": "%3C%21DOCTYPE%20html%3E%0A%3Chtml%20lang%3D%22en%22%3E%0A%3Chead%3E%0A%3Cmeta%20charset%3D%22UTF-8%22%20%2F%3E%0A%3Cmeta%20name%3D%22viewport%22%20content%3D%22width%3Ddevice-width%2C%20initial-scale%3D1.0%22%20%2F%3E%0A%3Ctitle%3EConfirm%20your%20email%3C%2Ftitle%3E%0A%3C%2Fhead%3E%0A%3Cbody%20style%3D%22margin%3A0%3B%20padding%3A0%3B%20background-color%3A%23f6f9fc%3B%20font-family%3A%20Arial%2C%20Helvetica%2C%20sans-serif%3B%22%3E%0A%0A%3C%21--%20Wrapper%20--%3E%0A%3Ctable%20width%3D%22100%25%22%20border%3D%220%22%20cellspacing%3D%220%22%20cellpadding%3D%220%22%20style%3D%22background-color%3A%23f6f9fc%3B%20padding%3A40px%200%3B%22%3E%0A%3Ctr%3E%0A%3Ctd%20align%3D%22center%22%3E%0A%3C%21--%20Container%20--%3E%0A%3Ctable%20width%3D%22600%22%20border%3D%220%22%20cellspacing%3D%220%22%20cellpadding%3D%220%22%20style%3D%22background-color%3A%23ffffff%3B%20border-radius%3A10px%3B%20box-shadow%3A0%204px%2010px%20rgba%280%2C0%2C0%2C0.05%29%3B%20overflow%3Ahidden%3B%22%3E%0A%0A%3C%21--%20Header%20--%3E%0A%3Ctr%3E%0A%3Ctd%20align%3D%22center%22%20style%3D%22padding%3A30px%200%3B%20background-color%3A%23ffffff%3B%22%3E%0A%3Cimg%20src%3D%22%7B%7BlogoUrl%7D%7D%22%20alt%3D%22%7B%7BcompanyName%7D%7D%20Logo%22%20width%3D%2260%22%20height%3D%2260%22%20style%3D%22display%3Ablock%3B%20border-radius%3A50%25%3B%22%3E%0A%3Ch1%20style%3D%22margin%3A15px%200%200%200%3B%20font-size%3A22px%3B%20color%3A%23333333%3B%22%3EConfirm%20your%20email%20address%3C%2Fh1%3E%0A%3C%2Ftd%3E%0A%3C%2Ftr%3E%0A%0A%3C%21--%20Body%20--%3E%0A%3Ctr%3E%0A%3Ctd%20style%3D%22padding%3A30px%3B%20color%3A%23555555%3B%20font-size%3A15px%3B%20line-height%3A1.6%3B%22%3E%0A%3Cp%3EHi%20%3Cstrong%3E%7B%7BfirstName%7D%7D%3C%2Fstrong%3E%2C%3C%2Fp%3E%0A%3Cp%3EThank%20you%20for%20signing%20up%21%20Please%20confirm%20your%20email%20address%20by%20clicking%20the%20button%20below.%20This%20helps%20us%20verify%20your%20identity%20and%20keep%20your%20account%20secure.%3C%2Fp%3E%0A%0A%3C%21--%20Button%20--%3E%0A%3Ctable%20border%3D%220%22%20cellspacing%3D%220%22%20cellpadding%3D%220%22%20style%3D%22margin%3A30px%20auto%3B%22%3E%0A%3Ctr%3E%0A%3Ctd%20align%3D%22center%22%3E%0A%3Ca%20href%3D%22%7B%7BconfirmUrl%7D%7D%22%20%0A%20style%3D%22background-color%3A%7B%7BprimaryColor%7D%7D%3B%0Aborder%3Anone%3B%0Aborder-radius%3A6px%3B%0Acolor%3A%23ffffff%3B%0Adisplay%3Ablock%3B%0Afont-size%3A16px%3B%0Afont-weight%3Abold%3B%0Apadding%3A14px%2036px%3B%0Atext-decoration%3Anone%3B%0Afont-family%3AArial%2C%20Helvetica%2C%20sans-serif%3B%0Abox-shadow%3A0%203px%208px%20rgba%280%2C0%2C0%2C0.15%29%3B%22%3E%0AConfirm%20Email%0A%3C%2Fa%3E%0A%3C%2Ftd%3E%0A%3C%2Ftr%3E%0A%3C%2Ftable%3E%0A%0A%3Cp%3EIf%20you%20didn%E2%80%99t%20create%20an%20account%2C%20you%20can%20safely%20ignore%20this%20email.%3C%2Fp%3E%0A%3Cp%3EThanks%2C%3Cbr%3EThe%20%7B%7BcompanyName%7D%7D%20Team%3C%2Fp%3E%0A%3C%2Ftd%3E%0A%3C%2Ftr%3E%0A%0A%3C%21--%20Divider%20--%3E%0A%3Ctr%3E%0A%3Ctd%20style%3D%22border-top%3A1px%20solid%20%23eeeeee%3B%22%3E%3C%2Ftd%3E%0A%3C%2Ftr%3E%0A%0A%3C%21--%20Footer%20--%3E%0A%3Ctr%3E%0A%3Ctd%20align%3D%22center%22%20style%3D%22padding%3A20px%3B%20font-size%3A13px%3B%20color%3A%23999999%3B%22%3E%0A%3Cp%3E%C2%A9%20%7B%7BcurrentYear%7D%7D%20%7B%7BcompanyName%7D%7D.%20All%20rights%20reserved.%3C%2Fp%3E%0A%3Cp%3E%3Ca%20href%3D%22%7B%7BappUrl%7D%7D%22%20style%3D%22color%3A%7B%7BprimaryColor%7D%7D%3B%20text-decoration%3Anone%3B%22%3EVisit%20our%20website%3C%2Fa%3E%3C%2Fp%3E%0A%3C%2Ftd%3E%0A%3C%2Ftr%3E%0A%0A%3C%2Ftable%3E%0A%3C%2Ftd%3E%0A%3C%2Ftr%3E%0A%3C%2Ftable%3E%0A%0A%3C%2Fbody%3E%0A%3C%2Fhtml%3E%0A"}, {"name": "fr-FR", "value": ""}, {"name": "th-TH", "value": ""}, {"name": "vi-VN", "value": ""}, {"name": "km-KH", "value": ""}, {"name": "zh-CN", "value": ""}]}', true, 'Admin', now(), null, null, null, null) ON CONFLICT DO NOTHING ;
        INSERT INTO communication.notification_template (id, type, code, description, notification_setting_id, email_sender, subject, list_of_recipient_types, content, is_latest_version, created_by, created_at, updated_by, updated_at, deleted_at, deleted_by) VALUES ('ef441b83-ad28-488c-b9f0-9f397ac6f56b', 'System', 'E000002', 'Reset password', '37f400c5-8bf4-4693-a95b-0c7dcaeb522f', null, '{"languages": [{"name": "en-US", "value": "Reset%20your%20password%20for%20%7B%7BcompanyName%7D%7D"}, {"name": "fr-FR", "value": ""}, {"name": "th-TH", "value": ""}, {"name": "vi-VN", "value": ""}, {"name": "km-KH", "value": ""}, {"name": "zh-CN", "value": ""}]}', null, '{"languages": [{"name": "en-US", "value": "%3C%21DOCTYPE%20html%3E%0A%3Chtml%20lang%3D%22en%22%3E%0A%3Chead%3E%0A%3Cmeta%20charset%3D%22UTF-8%22%20%2F%3E%0A%3Cmeta%20name%3D%22viewport%22%20content%3D%22width%3Ddevice-width%2C%20initial-scale%3D1.0%22%20%2F%3E%0A%3Ctitle%3EReset%20your%20password%3C%2Ftitle%3E%0A%3C%2Fhead%3E%0A%3Cbody%20style%3D%22margin%3A0%3B%20padding%3A0%3B%20background-color%3A%23f6f9fc%3B%20font-family%3A%20Arial%2C%20Helvetica%2C%20sans-serif%3B%22%3E%0A%0A%3C%21--%20Wrapper%20--%3E%0A%3Ctable%20width%3D%22100%25%22%20border%3D%220%22%20cellspacing%3D%220%22%20cellpadding%3D%220%22%20style%3D%22background-color%3A%23f6f9fc%3B%20padding%3A40px%200%3B%22%3E%0A%3Ctr%3E%0A%3Ctd%20align%3D%22center%22%3E%0A%3C%21--%20Container%20--%3E%0A%3Ctable%20width%3D%22600%22%20border%3D%220%22%20cellspacing%3D%220%22%20cellpadding%3D%220%22%20style%3D%22background-color%3A%23ffffff%3B%20border-radius%3A10px%3B%20box-shadow%3A0%204px%2010px%20rgba%280%2C0%2C0%2C0.05%29%3B%20overflow%3Ahidden%3B%22%3E%0A%0A%3C%21--%20Header%20--%3E%0A%3Ctr%3E%0A%3Ctd%20align%3D%22center%22%20style%3D%22padding%3A30px%200%3B%20background-color%3A%23ffffff%3B%22%3E%0A%3Cimg%20src%3D%22%7B%7BlogoUrl%7D%7D%22%20alt%3D%22%7B%7BcompanyName%7D%7D%20Logo%22%20width%3D%2260%22%20height%3D%2260%22%20style%3D%22display%3Ablock%3B%20border-radius%3A50%25%3B%22%3E%0A%3Ch1%20style%3D%22margin%3A15px%200%200%200%3B%20font-size%3A22px%3B%20color%3A%23333333%3B%22%3EReset%20your%20password%3C%2Fh1%3E%0A%3C%2Ftd%3E%0A%3C%2Ftr%3E%0A%0A%3C%21--%20Body%20--%3E%0A%3Ctr%3E%0A%3Ctd%20style%3D%22padding%3A30px%3B%20color%3A%23555555%3B%20font-size%3A15px%3B%20line-height%3A1.6%3B%22%3E%0A%3Cp%3EHi%20%3Cstrong%3E%7B%7BfullName%7D%7D%3C%2Fstrong%3E%2C%3C%2Fp%3E%0A%3Cp%3EWe%20received%20a%20request%20to%20reset%20your%20password%20for%20your%20%7B%7BcompanyName%7D%7D%20account.%20Click%20the%20button%20below%20to%20choose%20a%20new%20password.%3C%2Fp%3E%0A%0A%3C%21--%20Button%20--%3E%0A%3Ctable%20border%3D%220%22%20cellspacing%3D%220%22%20cellpadding%3D%220%22%20style%3D%22margin%3A30px%20auto%3B%22%3E%0A%3Ctr%3E%0A%3Ctd%20align%3D%22center%22%3E%0A%3Ca%20href%3D%22%7B%7BforgotPasswordLink%7D%7D%22%20%0A%20style%3D%22background-color%3A%7B%7BprimaryColor%7D%7D%3B%0Aborder%3Anone%3B%0Aborder-radius%3A6px%3B%0Acolor%3A%23ffffff%3B%0Adisplay%3Ablock%3B%0Afont-size%3A16px%3B%0Afont-weight%3Abold%3B%0Apadding%3A14px%2036px%3B%0Atext-decoration%3Anone%3B%0Afont-family%3AArial%2C%20Helvetica%2C%20sans-serif%3B%0Abox-shadow%3A0%203px%208px%20rgba%280%2C0%2C0%2C0.15%29%3B%22%3E%0AReset%20Password%0A%3C%2Fa%3E%0A%3C%2Ftd%3E%0A%3C%2Ftr%3E%0A%3C%2Ftable%3E%0A%0A%3Cp%3EIf%20you%20didn%E2%80%99t%20request%20a%20password%20reset%2C%20you%20can%20safely%20ignore%20this%20email.%20The%20link%20will%20expire%20automatically%20after%20a%20short%20time.%3C%2Fp%3E%0A%3Cp%3EThanks%2C%3Cbr%3EThe%20%7B%7BcompanyName%7D%7D%20Team%3C%2Fp%3E%0A%3C%2Ftd%3E%0A%3C%2Ftr%3E%0A%0A%3C%21--%20Divider%20--%3E%0A%3Ctr%3E%0A%3Ctd%20style%3D%22border-top%3A1px%20solid%20%23eeeeee%3B%22%3E%3C%2Ftd%3E%0A%3C%2Ftr%3E%0A%0A%3C%21--%20Footer%20--%3E%0A%3Ctr%3E%0A%3Ctd%20align%3D%22center%22%20style%3D%22padding%3A20px%3B%20font-size%3A13px%3B%20color%3A%23999999%3B%22%3E%0A%3Cp%3E%C2%A9%20%7B%7BcurrentYear%7D%7D%20%7B%7BcompanyName%7D%7D.%20All%20rights%20reserved.%3C%2Fp%3E%0A%3Cp%3E%3Ca%20href%3D%22%7B%7BappUrl%7D%7D%22%20style%3D%22color%3A%7B%7BprimaryColor%7D%7D%3B%20text-decoration%3Anone%3B%22%3EVisit%20our%20website%3C%2Fa%3E%3C%2Fp%3E%0A%3C%2Ftd%3E%0A%3C%2Ftr%3E%0A%0A%3C%2Ftable%3E%0A%3C%2Ftd%3E%0A%3C%2Ftr%3E%0A%3C%2Ftable%3E%0A%0A%3C%2Fbody%3E%0A%3C%2Fhtml%3E%0A"}, {"name": "fr-FR", "value": ""}, {"name": "th-TH", "value": ""}, {"name": "vi-VN", "value": ""}, {"name": "km-KH", "value": ""}, {"name": "zh-CN", "value": ""}]}', true, 'Admin', now(), null, null, null, null) ON CONFLICT DO NOTHING;
        INSERT INTO communication.notification_template (id, type, code, description, notification_setting_id, email_sender, subject, list_of_recipient_types, content, is_latest_version, created_by, created_at, updated_by, updated_at, deleted_at, deleted_by) VALUES ('5fabe6cd-532d-453d-8e7f-9c56e1aef22b', 'System', 'E000003', 'Invite to Admin', '37f400c5-8bf4-4693-a95b-0c7dcaeb522f', null, '{"languages": [{"name": "en-US", "value": "You%E2%80%99ve%20been%20invited%20to%20join%20%7B%7BcompanyName%7D%7D%20Admin"}, {"name": "fr-FR", "value": ""}, {"name": "th-TH", "value": ""}, {"name": "vi-VN", "value": ""}, {"name": "km-KH", "value": ""}, {"name": "zh-CN", "value": ""}]}', null, '{"languages": [{"name": "en-US", "value": "%3C%21DOCTYPE%20html%3E%3Chtml%20lang%3D%22en%22%3E%3Chead%3E%3Cmeta%20charset%3D%22UTF-8%22%20%2F%3E%3Cmeta%20name%3D%22viewport%22%20content%3D%22width%3Ddevice-width%2C%20initial-scale%3D1.0%22%20%2F%3E%3Ctitle%3EAdmin%20Invitation%3C%2Ftitle%3E%3C%2Fhead%3E%3Cbody%20style%3D%22margin%3A0%3B%20padding%3A0%3B%20background-color%3A%23f6f9fc%3B%20font-family%3A%20Arial%2C%20Helvetica%2C%20sans-serif%3B%22%3E%3C%21--%20Wrapper%20--%3E%3Ctable%20width%3D%22100%25%22%20border%3D%220%22%20cellspacing%3D%220%22%20cellpadding%3D%220%22%20style%3D%22background-color%3A%23f6f9fc%3B%20padding%3A40px%200%3B%22%3E%3Ctr%3E%3Ctd%20align%3D%22center%22%3E%3C%21--%20Container%20--%3E%3Ctable%20width%3D%22600%22%20border%3D%220%22%20cellspacing%3D%220%22%20cellpadding%3D%220%22%20style%3D%22background-color%3A%23ffffff%3B%20border-radius%3A10px%3B%20box-shadow%3A0%204px%2010px%20rgba%280%2C0%2C0%2C0.05%29%3B%20overflow%3Ahidden%3B%22%3E%3C%21--%20Header%20--%3E%3Ctr%3E%3Ctd%20align%3D%22center%22%20style%3D%22padding%3A30px%200%3B%20background-color%3A%23ffffff%3B%22%3E%3Cimg%20src%3D%22%7B%7BlogoUrl%7D%7D%22%20alt%3D%22%7B%7BcompanyName%7D%7D%20Logo%22%20width%3D%2260%22%20height%3D%2260%22%20style%3D%22display%3Ablock%3B%20border-radius%3A50%25%3B%22%3E%3Ch1%20style%3D%22margin%3A15px%200%200%200%3B%20font-size%3A22px%3B%20color%3A%23333333%3B%22%3EYou%E2%80%99ve%20been%20invited%20to%20%7B%7BcompanyName%7D%7D%20Admin%3C%2Fh1%3E%3C%2Ftd%3E%3C%2Ftr%3E%3C%21--%20Body%20--%3E%3Ctr%3E%3Ctd%20style%3D%22padding%3A30px%3B%20color%3A%23555555%3B%20font-size%3A15px%3B%20line-height%3A1.6%3B%22%3E%3Cp%3EHi%20%3Cstrong%3E%7B%7BuserName%7D%7D%3C%2Fstrong%3E%2C%3C%2Fp%3E%3Cp%3EYou%E2%80%99ve%20been%20invited%20to%20join%20the%20%3Cstrong%3E%7B%7BcompanyName%7D%7D%3C%2Fstrong%3E%20admin%20dashboard.%20This%20invitation%20grants%20you%20access%20to%20manage%20system%20data%2C%20users%2C%20and%20configurations.%3C%2Fp%3E%3Cp%3ETo%20accept%20this%20invitation%20and%20set%20up%20your%20admin%20account%2C%20please%20click%20the%20button%20below%3A%3C%2Fp%3E%3C%21--%20Button%20--%3E%3Ctable%20border%3D%220%22%20cellspacing%3D%220%22%20cellpadding%3D%220%22%20style%3D%22margin%3A30px%20auto%3B%22%3E%3Ctr%3E%3Ctd%20align%3D%22center%22%3E%3Ca%20href%3D%22%7B%7BinviteUrl%7D%7D%22%20%20style%3D%22background-color%3A%7B%7BprimaryColor%7D%7D%3Bborder%3Anone%3Bborder-radius%3A6px%3Bcolor%3A%23ffffff%3Bdisplay%3Ablock%3Bfont-size%3A16px%3Bfont-weight%3Abold%3Bpadding%3A14px%2036px%3Btext-decoration%3Anone%3Bfont-family%3AArial%2C%20Helvetica%2C%20sans-serif%3Bbox-shadow%3A0%203px%208px%20rgba%280%2C0%2C0%2C0.15%29%3B%22%3EAccept%20Invitation%3C%2Fa%3E%3C%2Ftd%3E%3C%2Ftr%3E%3C%2Ftable%3E%3Cp%3EThis%20link%20will%20expire%20in%20%3Cstrong%3E%7B%7BexpireTime%7D%7D%3C%2Fstrong%3E.%20If%20you%20weren%E2%80%99t%20expecting%20this%20invitation%2C%20you%20can%20safely%20ignore%20this%20email.%3C%2Fp%3E%3Cp%3EBest%20regards%2C%3Cbr%3EThe%20%7B%7BcompanyName%7D%7D%20Team%3C%2Fp%3E%3C%2Ftd%3E%3C%2Ftr%3E%3C%21--%20Divider%20--%3E%3Ctr%3E%3Ctd%20style%3D%22border-top%3A1px%20solid%20%23eeeeee%3B%22%3E%3C%2Ftd%3E%3C%2Ftr%3E%3C%21--%20Footer%20--%3E%3Ctr%3E%3Ctd%20align%3D%22center%22%20style%3D%22padding%3A20px%3B%20font-size%3A13px%3B%20color%3A%23999999%3B%22%3E%3Cp%3E%C2%A9%20%7B%7BcurrentYear%7D%7D%20%7B%7BcompanyName%7D%7D.%20All%20rights%20reserved.%3C%2Fp%3E%3Cp%3E%3Ca%20href%3D%22%7B%7BappUrl%7D%7D%22%20style%3D%22color%3A%7B%7BprimaryColor%7D%7D%3B%20text-decoration%3Anone%3B%22%3EVisit%20our%20website%3C%2Fa%3E%3C%2Fp%3E%3C%2Ftd%3E%3C%2Ftr%3E%3C%2Ftable%3E%3C%2Ftd%3E%3C%2Ftr%3E%3C%2Ftable%3E%3C%2Fbody%3E%3C%2Fhtml%3E"}, {"name": "fr-FR", "value": ""}, {"name": "th-TH", "value": ""}, {"name": "vi-VN", "value": ""}, {"name": "km-KH", "value": ""}, {"name": "zh-CN", "value": ""}]}', true, 'Admin', now(), null, null, null, null) ON CONFLICT DO NOTHING;
    END
$$;
