USE voting_system;

-- test user - country
/*
SELECT user_id, co.code
FROM Districts D
JOIN Cities c on c.id = D.city_id
JOIN States_Governorates s on s.id = c.states_governorates_id
JOIN Countries co on co.code = s.country_code
JOIN locates u on u.district_id = D.id;
*/
/*

SELECT
  vote_id,
  CONVERT(
    AES_DECRYPT(
        FROM_BASE64(encrypted_candidate),
        UNHEX(SHA2('b7b_nagat', 256)),
        iv
        )USING utf8mb4
  ) AS decrypted_candidate
FROM encrypted_candidates;


set @iv = UNHEX('000102030405060708090A0B0C0D0E0F');
set @key_str = UNHEX(SHA2('b7b_nagat', 256));
CALL EncryptData(CAST(7 AS CHAR), @key_str, @encrypted_text, @iv);
SELECT @encrypted_text AS 'Encrypted', TO_BASE64(@iv) AS 'IV (base64)';

*/

-- call calculate_election_results_per_group(1, UNHEX(SHA2('b7b_nagat', 256)));

/*
call p_calculate_election_results_per_group(1, 'b7b_nagat');
call p_calculate_final_election_results(1);

call p_calculate_election_results_per_group(3, 'b7b_nagat');
call p_calculate_final_election_results(3);


call p_calculate_election_results_per_group(2,'b7b_nagat');
call p_calculate_final_election_results(2);


set @iv = UNHEX('000102030405060708090A0B0C0D0E0F');
CALL p_EncryptData(CAST(13 AS CHAR), UNHEX(SHA2('b7b_nagat', 256)), @encrypted_text, UNHEX('000102030405060708090A0B0C0D0E0F'));
SELECT @encrypted_text AS 'Encrypted', TO_BASE64(@iv) AS 'IV (base64)';

CALL p_DecryptData(@encrypted_text, UNHEX(SHA2('b7b_nagat', 256)), UNHEX('000102030405060708090A0B0C0D0E0F'), @decrypted_text);
SELECT @decrypted_text AS 'Decrypted Value';


CALL p_EncryptData(CAST(12 AS CHAR), UNHEX(SHA2('b7b_nagat', 256)), @encrypted_text, UNHEX('000102030405060708090A0B0C0D0E0F'));
SELECT @encrypted_text AS 'Encrypted', TO_BASE64(@iv) AS 'IV (base64)';

CALL p_DecryptData(@encrypted_text, UNHEX(SHA2('b7b_nagat', 256)), UNHEX('000102030405060708090A0B0C0D0E0F'), @decrypted_text);
SELECT @decrypted_text AS 'Decrypted Value';

*/
/*
call p_calculate_election_results_per_group(4,'b7b_nagat');
call p_calculate_final_election_results(4);

call p_calculate_election_results_per_group(3,'b7b_nagat');
call p_calculate_final_election_results(3);


SELECT * FROM ElectionResultsPerGroup;
SELECT * FROM ElectionResults;


call p_get_election_results(4);
call p_get_election_results(3);

call p_get_user_group_id(26, 1, @group_id);
SELECT @group_id;
*/