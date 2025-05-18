USE voting_system;

-- encryption & decryption
-- This is a simple example of how to encrypt and decrypt data in MySQL using AES encryption.

set @hash = SHA2('b7b_nagat', 256); -- Generate a key from a passphrase
set @key_str = UNHEX(@hash); -- Generate a key from the passphrase

DROP PROCEDURE IF EXISTS p_EncryptData;
DELIMITER //
CREATE PROCEDURE p_EncryptData(
    IN plain_text TEXT,
    IN key_str VARBINARY(64),
    OUT encrypted_text TEXT,
    IN iv VARBINARY(16)
    -- OUT iv VARBINARY(16) -- IV for AES encryption
)
BEGIN
    -- SET iv = RANDOM_BYTES(16); -- Generate a random IV
    SET encrypted_text = TO_BASE64(
        AES_ENCRYPT(CONVERT(plain_text USING utf8mb4), key_str, iv)
    );
END;
//
DELIMITER ;




DROP PROCEDURE IF EXISTS p_DecryptData;
DELIMITER //
CREATE PROCEDURE p_DecryptData(
    IN encrypted_text TEXT,
    IN key_str VARBINARY(64),
    IN iv VARBINARY(16),
    OUT decrypted_text TEXT
)
BEGIN
    SET decrypted_text = CONVERT(
        AES_DECRYPT(FROM_BASE64(encrypted_text), key_str, iv) USING utf8mb4
    );
END;
//
DELIMITER ;


DELIMITER ;


-- CALL EncryptData(CAST(1 AS CHAR), @key_str, @encrypted_text, @iv);
-- SELECT @encrypted_text AS 'Encrypted', TO_BASE64(@iv) AS 'IV (base64)';



DELIMITER //
CREATE PROCEDURE p_calculate_election_results_per_group
(
    IN p_election_id INT,
    IN key_str VARCHAR(64) -- The key used for encryption/decryption
)
BEGIN

    -- Clear existing results
    WITH GroupsOfElection AS (
        SELECT id FROM ElectionGroups WHERE election_id = p_election_id
    )
    DELETE FROM ElectionResultsPerGroup WHERE group_id IN (SELECT id FROM GroupsOfElection);

    -- Start transaction
    START TRANSACTION;

		INSERT INTO ElectionResultsPerGroup (group_id, candidate_id, vote_count, percentage)

        WITH TotalVotesPerGroup AS (
            SELECT vd.group_id, COUNT(*) AS total_votes
            FROM encrypted_candidates ec
            JOIN VoteDetails vd ON ec.vote_id = vd.id
            JOIN ElectionGroups eg ON vd.group_id = eg.id
            WHERE eg.election_id = p_election_id
            GROUP BY vd.group_id
        )
        
        SELECT 
            vd.group_id,
            CONVERT(
                AES_DECRYPT(
                    FROM_BASE64(encrypted_candidate),
                    UNHEX(SHA2(key_str, 256)),
                    ec.iv
                )USING utf8mb4
            ) AS decrypted_candidate,
            COUNT(vd.id) AS vote_count,
            CASE 
                WHEN tv.total_votes = 0 OR tv.total_votes IS NULL THEN 0
                ELSE COUNT(vd.id) * 100.0 / tv.total_votes
            END AS percentage
        FROM encrypted_candidates ec
        JOIN VoteDetails vd ON ec.vote_id = vd.id
        JOIN ElectionGroups eg ON vd.group_id = eg.id
        JOIN TotalVotesPerGroup tv ON vd.group_id = tv.group_id
        WHERE eg.election_id = p_election_id
        GROUP BY vd.group_id, decrypted_candidate;

    -- Commit transaction
    COMMIT;
END//

-- Function to calculate election results based on type
DELIMITER //

CREATE PROCEDURE p_calculate_final_election_results(IN p_election_id INT)
BEGIN
    DECLARE election_type VARCHAR(20);
    DECLARE seats INT;
    DECLARE total_score_sum INT;

    -- Get the election type
    SELECT vote_count_method, max_choices INTO election_type, seats  
    FROM Elections e
    WHERE id = p_election_id;

    -- Clear existing results
    DELETE FROM ElectionResults 
    WHERE candidate_id IN (SELECT id FROM Candidates WHERE election_id = p_election_id);

    -- Start transaction
    START TRANSACTION;

    -- Calculate results based on election type
    IF election_type = 'POPULAR_VOTE' THEN
        BEGIN

            SELECT SUM(vote_count) INTO total_score_sum
            FROM ElectionResultsPerGroup erg
            JOIN ElectionGroups eg ON erg.group_id = eg.id
            WHERE eg.election_id = p_election_id;

            INSERT INTO ElectionResults (candidate_id, vote_count, percentage, is_winner)
            SELECT 
                erg.candidate_id, 
                SUM(erg.vote_count) AS total_votes,
                CASE 
                    WHEN total_score_sum = 0 THEN 0
                    ELSE ROUND(SUM(erg.vote_count) * 100.0 / total_score_sum, 2)
                END AS percentage,
                0 AS is_winner
            FROM ElectionResultsPerGroup erg
            JOIN ElectionGroups eg ON erg.group_id = eg.id
            WHERE eg.election_id = p_election_id
            GROUP BY erg.candidate_id
            ORDER BY total_votes DESC;

        END;

    ELSE
        BEGIN

            SELECT SUM(score) INTO total_score_sum
            FROM ElectionGroups eg
            WHERE election_id = p_election_id;

            INSERT INTO ElectionResults (candidate_id, vote_count, percentage, is_winner)
            SELECT 
                erg.candidate_id,
                SUM(eg.score) AS total_score,
                CASE 
                    WHEN total_score_sum = 0 THEN 0
                    ELSE ROUND(SUM(eg.score) * 100.0 / total_score_sum, 2)
                END AS percentage,
                0 AS is_winner
            FROM ElectionResultsPerGroup erg
            JOIN ElectionGroups eg ON erg.group_id = eg.id AND eg.election_id = p_election_id
            -- Returning the max_value of each group
            JOIN (
                SELECT group_id, MAX(vote_count) AS max_votes
                FROM ElectionResultsPerGroup erg
                JOIN ElectionGroups eg ON erg.group_id = eg.id AND eg.election_id = p_election_id
                GROUP BY group_id
            ) top
            ON erg.group_id = top.group_id AND erg.vote_count = top.max_votes  -- Filtering out the highest-voted candidates per group.
            GROUP BY erg.candidate_id;
        END;
    END IF;

    UPDATE ElectionResults er
    JOIN (
    SELECT candidate_id
        FROM (
            SELECT 
                er.candidate_id, 
                RANK() OVER (ORDER BY SUM(er.vote_count) DESC) AS rnk
            FROM ElectionResults er
            JOIN ElectionResultsPerGroup erg ON erg.candidate_id = er.candidate_id
            JOIN ElectionGroups eg ON erg.group_id = eg.id
            WHERE eg.election_id = p_election_id
            GROUP BY er.candidate_id
        ) ranked
        WHERE rnk <= seats
    ) winners
    ON er.candidate_id = winners.candidate_id
    SET er.is_winner = 1;


    -- Commit transaction
    COMMIT;
END//

DELIMITER ;