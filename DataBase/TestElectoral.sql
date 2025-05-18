-- For Election 3 (Electoral college, 4 candidates, 4 groups)

-- Election 3 - Presidential Election group mapping to districts (electoral college)
-- Western States
INSERT INTO GroupDistricts (group_id, district_id, election_id) VALUES
(8, 1, 3), -- Downtown LA
(8, 2, 3), -- Hollywood
(8, 3, 3), -- Mission District SF
(8, 4, 3), -- SoMa
(8, 17, 3), -- CBD Sydney
(8, 19, 3); -- Central Brisbane

-- Eastern States
INSERT INTO GroupDistricts (group_id, district_id, election_id) VALUES
(9, 5, 3), -- Manhattan
(9, 6, 3), -- Brooklyn
(9, 11, 3), -- Downtown Toronto
(9, 12, 3), -- East End Ottawa
(9, 18, 3); -- Northern Beaches Newcastle

-- Northern States
INSERT INTO GroupDistricts (group_id, district_id, election_id) VALUES
(10, 13, 3), -- West End London
(10, 14, 3), -- City Centre Manchester
(10, 15, 3), -- Old Town Edinburgh
(10, 16, 3), -- West End Glasgow
(10, 20, 3); -- Surfers Paradise Gold Coast

-- Southern States - this will be the one group with an even number of districts
INSERT INTO GroupDistricts (group_id, district_id, election_id) VALUES
(11, 7, 3), -- Downtown Houston
(11, 8, 3), -- Uptown Dallas
(11, 9, 3), -- South Beach Miami
(11, 10, 3); -- Disney Area Orlando


-- Simulating votes for Election 3 with odd number of voters in 3 groups and even in 1
INSERT INTO VoteDetails (hashed_user_id, group_id, timestamp) VALUES
-- Western States votes (Group 8) - 3 voters (odd)
(SHA2(20, 256), 8, '2024-11-03 09:15:00'),
(SHA2(30, 256), 8, '2024-11-03 10:20:00'),
(SHA2(19, 256), 8, '2024-11-03 11:25:00'),
-- Eastern States votes (Group 9) - 5 voters (odd)
(SHA2(1, 256), 9, '2024-11-03 09:30:00'),
(SHA2(2, 256), 9, '2024-11-03 10:40:00'),
(SHA2(3, 256), 9, '2024-11-03 11:50:00'),
(SHA2(4, 256), 9, '2024-11-03 12:30:00'),
(SHA2(5, 256), 9, '2024-11-03 13:10:00'),
-- Northern States votes (Group 10) - 7 voters (odd)
(SHA2(6, 256), 10, '2024-11-03 09:45:00'),
(SHA2(7, 256), 10, '2024-11-03 10:55:00'),
(SHA2(8, 256), 10, '2024-11-03 11:35:00'),
(SHA2(9, 256), 10, '2024-11-03 12:15:00'),
(SHA2(10, 256), 10, '2024-11-03 13:25:00'),
(SHA2(11, 256), 10, '2024-11-03 14:05:00'),
(SHA2(12, 256), 10, '2024-11-03 14:45:00'),
-- Southern States votes (Group 11) - 4 voters (even - this is the exception)
(SHA2(13, 256), 11, '2024-11-03 10:00:00'),
(SHA2(14, 256), 11, '2024-11-03 11:10:00'),
(SHA2(15, 256), 11, '2024-11-03 12:20:00'),
(SHA2(16, 256), 11, '2024-11-03 13:30:00');


-- Western States (3 voters)
INSERT INTO encrypted_candidates (vote_id, encrypted_candidate, iv) VALUES
(29, 'ApGH48DrobA6yuQbCMbkHA==', UNHEX('000102030405060708090A0B0C0D0E0F')), -- candidate 1
(30, '0B17cawyBmmyobbbNLaHKg==', UNHEX('000102030405060708090A0B0C0D0E0F')), -- candidate 2
(31, 'ApGH48DrobA6yuQbCMbkHA==', UNHEX('000102030405060708090A0B0C0D0E0F')), -- candidate 1

-- Eastern States (5 voters)
(32, 'S9U6rUQDxxfjLQVc3YVivQ==', UNHEX('000102030405060708090A0B0C0D0E0F')), -- candidate 3
(33, 'ApGH48DrobA6yuQbCMbkHA==', UNHEX('000102030405060708090A0B0C0D0E0F')),  -- candidate 1
(34, '0B17cawyBmmyobbbNLaHKg==', UNHEX('000102030405060708090A0B0C0D0E0F')),  -- candidate 2
(35, 'S9U6rUQDxxfjLQVc3YVivQ==', UNHEX('000102030405060708090A0B0C0D0E0F')), -- candidate 3
(36, 'ApGH48DrobA6yuQbCMbkHA==', UNHEX('000102030405060708090A0B0C0D0E0F')),  -- candidate 1

-- Northern States (7 voters)
(37, 'gT+PkXRzA/CO3lrW4nCZtg==', UNHEX('000102030405060708090A0B0C0D0E0F')), -- candidate 4
(38, '0B17cawyBmmyobbbNLaHKg==', UNHEX('000102030405060708090A0B0C0D0E0F')),  -- candidate 2
(39, 'gT+PkXRzA/CO3lrW4nCZtg==', UNHEX('000102030405060708090A0B0C0D0E0F')), -- candidate 4
(40, 'ApGH48DrobA6yuQbCMbkHA==', UNHEX('000102030405060708090A0B0C0D0E0F')),  -- candidate 1
(41, 'S9U6rUQDxxfjLQVc3YVivQ==', UNHEX('000102030405060708090A0B0C0D0E0F')),  -- candidate 3
(42, 'gT+PkXRzA/CO3lrW4nCZtg==', UNHEX('000102030405060708090A0B0C0D0E0F')), -- candidate 4
(43, '0B17cawyBmmyobbbNLaHKg==', UNHEX('000102030405060708090A0B0C0D0E0F')),  -- candidate 2

-- Southern States (4 voters - even)
(44, 'S9U6rUQDxxfjLQVc3YVivQ==', UNHEX('000102030405060708090A0B0C0D0E0F')), -- candidate 3
(45, 'gT+PkXRzA/CO3lrW4nCZtg==', UNHEX('000102030405060708090A0B0C0D0E0F')), -- candidate 4
(46, 'S9U6rUQDxxfjLQVc3YVivQ==', UNHEX('000102030405060708090A0B0C0D0E0F')), -- candidate 3
(47, 'S9U6rUQDxxfjLQVc3YVivQ==', UNHEX('000102030405060708090A0B0C0D0E0F')); -- candidate 3


