USE voting_system;

-- For Election 1 (Popular vote, 3 candidates, 4 groups)


-- Election 1 - City Council Election group mapping to districts
-- North District Group
INSERT INTO GroupDistricts (group_id, district_id, election_id) VALUES
(1, 1, 1), -- Downtown LA in North District group
(1, 2, 1), -- Hollywood in North District group
(1, 5, 1), -- Manhattan in North District group
(1, 6, 1); -- Brooklyn in North District group

-- South District Group
INSERT INTO GroupDistricts (group_id, district_id, election_id) VALUES
(2, 7, 1), -- Downtown Houston in South District group
(2, 8, 1), -- Uptown Dallas in South District group
(2, 9, 1), -- South Beach Miami in South District group
(2, 10, 1); -- Disney Area Orlando in South District group

-- East District Group
INSERT INTO GroupDistricts (group_id, district_id, election_id) VALUES
(3, 11, 1), -- Downtown Toronto in East District group
(3, 12, 1), -- East End Ottawa in East District group
(3, 15, 1), -- Old Town Edinburgh in East District group
(3, 16, 1); -- West End Glasgow in East District group

-- West District Group
INSERT INTO GroupDistricts (group_id, district_id, election_id) VALUES
(4, 3, 1), -- Mission District SF in West District group
(4, 4, 1), -- SoMa SF in West District group
(4, 13, 1), -- West End London in West District group
(4, 14, 1); -- City Centre Manchester in West District group



-- Simulating votes for Election 1
INSERT INTO VoteDetails (hashed_user_id, group_id, timestamp) VALUES
-- North District votes (Group 1)
(SHA2(1, 256), 1, '2025-06-01 09:15:00'),
(SHA2(2, 256), 1, '2025-06-01 10:20:00'),
(SHA2(11, 256), 1, '2025-06-01 11:30:00'),
(SHA2(21, 256), 1, '2025-06-01 12:45:00'),
-- South District votes (Group 2)
(SHA2(3, 256), 2, '2025-06-01 09:30:00'),
(SHA2(4, 256), 2, '2025-06-01 10:40:00'),
(SHA2(12, 256), 2, '2025-06-01 11:50:00'),
(SHA2(22, 256), 2, '2025-06-01 13:00:00'),
-- East District votes (Group 3)
(SHA2(5, 256), 3, '2025-06-01 09:45:00'),
(SHA2(6, 256), 3, '2025-06-01 10:55:00'),
(SHA2(13, 256), 3, '2025-06-01 12:05:00'),
(SHA2(23, 256), 3, '2025-06-01 13:15:00'),
-- West District votes (Group 4)
(SHA2(7, 256), 4, '2025-06-01 10:00:00'),
(SHA2(8, 256), 4, '2025-06-01 11:10:00'),
(SHA2(14, 256), 4, '2025-06-01 12:20:00'),
(SHA2(24, 256), 4, '2025-06-01 13:30:00');


-- For Election 1 (simple choice)
INSERT INTO encrypted_candidates (vote_id, encrypted_candidate, iv) VALUES
(1, 'EGYdv18draDr6qBO3O2S1A==', UNHEX('000102030405060708090A0B0C0D0E0F')),
(2, 'Y1KnLHCSBF2SDOTh30Q3BA==', UNHEX('000102030405060708090A0B0C0D0E0F')),
(3, 'EGYdv18draDr6qBO3O2S1A==', UNHEX('000102030405060708090A0B0C0D0E0F')),
(4, '7d3dzNjhQvkOnTOBFiji5w==', UNHEX('000102030405060708090A0B0C0D0E0F')),
(5, 'Y1KnLHCSBF2SDOTh30Q3BA==', UNHEX('000102030405060708090A0B0C0D0E0F')),
(6, '7d3dzNjhQvkOnTOBFiji5w==', UNHEX('000102030405060708090A0B0C0D0E0F')),
(7, 'EGYdv18draDr6qBO3O2S1A==', UNHEX('000102030405060708090A0B0C0D0E0F')),
(8, 'Y1KnLHCSBF2SDOTh30Q3BA==', UNHEX('000102030405060708090A0B0C0D0E0F')),
(9, 'EGYdv18draDr6qBO3O2S1A==', UNHEX('000102030405060708090A0B0C0D0E0F')),
(10, '7d3dzNjhQvkOnTOBFiji5w==', UNHEX('000102030405060708090A0B0C0D0E0F')),
(11, 'Y1KnLHCSBF2SDOTh30Q3BA==', UNHEX('000102030405060708090A0B0C0D0E0F')),
(12, 'EGYdv18draDr6qBO3O2S1A==', UNHEX('000102030405060708090A0B0C0D0E0F')),
(13, '7d3dzNjhQvkOnTOBFiji5w==', UNHEX('000102030405060708090A0B0C0D0E0F')),
(14, 'Y1KnLHCSBF2SDOTh30Q3BA==', UNHEX('000102030405060708090A0B0C0D0E0F')),
(15, 'EGYdv18draDr6qBO3O2S1A==', UNHEX('000102030405060708090A0B0C0D0E0F')),
(16, '7d3dzNjhQvkOnTOBFiji5w==', UNHEX('000102030405060708090A0B0C0D0E0F'));


