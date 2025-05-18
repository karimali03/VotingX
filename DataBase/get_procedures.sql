DELIMITER //
CREATE PROCEDURE p_get_election_results(
    IN p_election_id INT
)

BEGIN
    DECLARE election_type VARCHAR(20);
    SELECT type_name INTO election_type
    FROM Elections
    WHERE id = p_election_id;
    
    IF election_type = 'REFERENDUM' THEN
        SELECT 
            e.id, 
            e.election_name,
            c.option_label, 
            c.id AS Candidate_id,
            IFNULL(er.vote_count, 0) AS vote_count, 
            IFNULL(er.percentage, 0) AS percentage, 
            IFNULL(er.is_winner, 0) AS is_winner
        FROM Elections e
        JOIN Candidates c ON c.election_id = e.id
        LEFT JOIN ElectionResults er ON er.candidate_id = c.id
        WHERE e.id = p_election_id;

    ELSE
        SELECT 
            e.id, 
            e.election_name, 
            u.first_name, 
            u.last_name, 
            c.id AS Candidate_id,
            IFNULL(er.vote_count, 0) AS vote_count, 
            IFNULL(er.percentage, 0) AS percentage, 
            IFNULL(er.is_winner, 0) AS is_winner
        FROM Elections e
        JOIN Candidates c ON c.election_id = e.id
        LEFT JOIN ElectionResults er ON er.candidate_id = c.id
        JOIN Users u ON u.id = c.user_id
        WHERE e.id = p_election_id;
    END IF;

END//


CREATE PROCEDURE p_get_user_group_id(
    IN u_id INT,
    IN elec_id INT,
    OUT group_id INT 
)
BEGIN
    
    SELECT gd.group_id INTO group_id
    FROM Users u
    JOIN locates l ON l.user_id = u.id
    JOIN Districts d ON d.id = l.district_id
    JOIN GroupDistricts gd ON gd.district_id = d.id AND gd.election_id = elec_id
    WHERE u.id = u_id;

END//

DELIMITER ;




