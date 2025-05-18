
-- For Election 4 (Referendum)

-- General Population Group (includes all districts)
INSERT INTO GroupDistricts (group_id, district_id, election_id) VALUES
(12, 1, 4), -- Downtown LA
(12, 2, 4), -- Hollywood
(12, 3, 4), -- Mission District SF
(12, 4, 4), -- SoMa
(12, 5, 4), -- Manhattan
(12, 6, 4), -- Brooklyn
(12, 7, 4), -- Downtown Houston
(12, 8, 4), -- Uptown Dallas
(12, 9, 4), -- South Beach Miami
(12, 10, 4), -- Disney Area Orlando
(12, 11, 4), -- Downtown Toronto
(12, 12, 4), -- East End Ottawa
(12, 13, 4), -- West End London
(12, 14, 4), -- City Centre Manchester
(12, 15, 4), -- Old Town Edinburgh
(12, 16, 4), -- West End Glasgow
(12, 17, 4), -- CBD Sydney
(12, 18, 4), -- Northern Beaches Newcastle
(12, 19, 4), -- Central Brisbane
(12, 20, 4); -- Surfers Paradise Gold Coast


-- Simulating votes for Election 4
INSERT INTO VoteDetails (hashed_user_id, group_id, timestamp) VALUES
-- General Population votes (Group 12)
(SHA2(7, 256), 12, '2025-08-10 09:15:00'),
(SHA2(8, 256), 12, '2025-08-10 10:20:00'),
(SHA2(9, 256), 12, '2025-08-10 11:30:00'),
(SHA2(10, 256), 12, '2025-08-10 12:45:00'),
(SHA2(11, 256), 12, '2025-08-10 13:30:00'),
(SHA2(12, 256), 12, '2025-08-10 14:15:00'),
(SHA2(13, 256), 12, '2025-08-10 15:00:00'),
(SHA2(14, 256), 12, '2025-08-10 15:45:00');


-- For Election 4 (referendum)
INSERT INTO encrypted_candidates (vote_id, encrypted_candidate, iv) VALUES
(48, 'yCV1T+W8klkbx/DsvYqbow==', UNHEX('000102030405060708090A0B0C0D0E0F')),
(49, 'PuWx91yn70n2JRafFhxb4Q==', UNHEX('000102030405060708090A0B0C0D0E0F')),
(50, 'yCV1T+W8klkbx/DsvYqbow==', UNHEX('000102030405060708090A0B0C0D0E0F')),
(51, 'PuWx91yn70n2JRafFhxb4Q==', UNHEX('000102030405060708090A0B0C0D0E0F')),
(52, 'yCV1T+W8klkbx/DsvYqbow==', UNHEX('000102030405060708090A0B0C0D0E0F')),
(53, 'yCV1T+W8klkbx/DsvYqbow==', UNHEX('000102030405060708090A0B0C0D0E0F')),
(54, 'PuWx91yn70n2JRafFhxb4Q==', UNHEX('000102030405060708090A0B0C0D0E0F')),
(55, 'yCV1T+W8klkbx/DsvYqbow==', UNHEX('000102030405060708090A0B0C0D0E0F'));

