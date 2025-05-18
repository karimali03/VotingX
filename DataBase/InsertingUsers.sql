USE voting_system;


-- Insert Countries data
INSERT INTO Countries (code, name) VALUES 
('USA', 'United States of America'),
('CAN', 'Canada'),
('GBR', 'United Kingdom'),
('AUS', 'Australia');

-- Insert States/Governorates data
INSERT INTO States_Governorates (name, country_code) VALUES 
('California', 'USA'),
('New York', 'USA'),
('Texas', 'USA'),
('Florida', 'USA'),
('Ontario', 'CAN'),
('British Columbia', 'CAN'),
('England', 'GBR'),
('Scotland', 'GBR'),
('New South Wales', 'AUS'),
('Queensland', 'AUS');

-- Insert Cities data
INSERT INTO Cities (name, states_governorates_id) VALUES 
('Los Angeles', 1),
('San Francisco', 1),
('New York City', 2),
('Buffalo', 2),
('Houston', 3),
('Dallas', 3),
('Miami', 4),
('Orlando', 4),
('Toronto', 5),
('Ottawa', 5),
('Vancouver', 6),
('Victoria', 6),
('London', 7),
('Manchester', 7),
('Edinburgh', 8),
('Glasgow', 8),
('Sydney', 9),
('Newcastle', 9),
('Brisbane', 10),
('Gold Coast', 10);

-- Insert Districts data
INSERT INTO Districts (name, city_id) VALUES 
('Downtown', 1),
('Hollywood', 1),
('Mission District', 2),
('SoMa', 2),
('Manhattan', 3),
('Brooklyn', 3),
('Downtown', 5),
('Uptown', 6),
('South Beach', 7),
('Disney Area', 8),
('Downtown', 9),
('East End', 10),
('West End', 11),
('James Bay', 12),
('Westminster', 13),
('City Centre', 14),
('Old Town', 15),
('West End', 16),
('CBD', 17),
('Northern Beaches', 18),
('Central', 19),
('Surfers Paradise', 20);


-- Insert 30 Users data
INSERT INTO Users (first_name, middle_name, last_name, gender, birth_date, email, password, phone, current_address, account_verified, profile_image) VALUES 
('John', 'A', 'Smith', 'male', '1985-04-12', 'john.smith@email.com', SHA2('password123', 256), '555-123-4567', '123 Main St', TRUE, 'profile1.jpg'),
('Jane', NULL, 'Doe', 'female', '1990-07-22', 'jane.doe@email.com', SHA2('password456', 256), '555-234-5678', '456 Elm St', TRUE, 'profile2.jpg'),
('Michael', 'B', 'Johnson', 'male', '1978-11-30', 'michael.johnson@email.com', SHA2('password789', 256), '555-345-6789', '789 Oak St', TRUE, 'profile3.jpg'),
('Emily', 'C', 'Williams', 'female', '1992-03-15', 'emily.williams@email.com', SHA2('passwordabc', 256), '555-456-7890', '101 Pine St', TRUE, 'profile4.jpg'),
('David', NULL, 'Brown', 'male', '1983-09-05', 'david.brown@email.com', SHA2('passworddef', 256), '555-567-8901', '202 Cedar St', TRUE, 'profile5.jpg'),
('Sarah', 'E', 'Miller', 'female', '1995-06-18', 'sarah.miller@email.com', SHA2('passwordghi', 256), '555-678-9012', '303 Birch St', TRUE, 'profile6.jpg'),
('Robert', 'F', 'Wilson', 'male', '1980-12-22', 'robert.wilson@email.com', SHA2('passwordjkl', 256), '555-789-0123', '404 Maple St', TRUE, 'profile7.jpg'),
('Jennifer', NULL, 'Moore', 'female', '1988-02-28', 'jennifer.moore@email.com', SHA2('passwordmno', 256), '555-890-1234', '505 Spruce St', TRUE, 'profile8.jpg'),
('William', 'H', 'Taylor', 'male', '1975-08-14', 'william.taylor@email.com', SHA2('passwordpqr', 256), '555-901-2345', '606 Walnut St', TRUE, 'profile9.jpg'),
('Elizabeth', 'I', 'Anderson', 'female', '1993-05-07', 'elizabeth.anderson@email.com', SHA2('passwordstu', 256), '555-012-3456', '707 Cherry St', TRUE, 'profile10.jpg'),
('James', NULL, 'Thomas', 'male', '1982-01-25', 'james.thomas@email.com', SHA2('passwordvwx', 256), '555-987-6543', '808 Aspen St', FALSE, 'profile11.jpg'),
('Patricia', 'K', 'Jackson', 'female', '1987-10-17', 'patricia.jackson@email.com', SHA2('passwordyz1', 256), '555-876-5432', '909 Redwood St', TRUE, 'profile12.jpg'),
('Richard', 'L', 'White', 'male', '1979-04-09', 'richard.white@email.com', SHA2('password234', 256), '555-765-4321', '110 Fir St', TRUE, 'profile13.jpg'),
('Linda', NULL, 'Harris', 'female', '1991-11-03', 'linda.harris@email.com', SHA2('password567', 256), '555-654-3210', '211 Sequoia St', TRUE, 'profile14.jpg'),
('Charles', 'N', 'Martin', 'male', '1984-07-29', 'charles.martin@email.com', SHA2('password890', 256), '555-543-2109', '312 Sycamore St', TRUE, 'profile15.jpg'),
('Barbara', 'O', 'Thompson', 'female', '1996-02-12', 'barbara.thompson@email.com', SHA2('passwordabc', 256), '555-432-1098', '413 Willow St', FALSE, 'profile16.jpg'),
('Joseph', NULL, 'Garcia', 'male', '1981-08-23', 'joseph.garcia@email.com', SHA2('passworddef', 256), '555-321-0987', '514 Beech St', TRUE, 'profile17.jpg'),
('Margaret', 'Q', 'Martinez', 'female', '1989-03-19', 'margaret.martinez@email.com', SHA2('passwordghi', 256), '555-210-9876', '615 Hickory St', TRUE, 'profile18.jpg'),
('Thomas', 'R', 'Robinson', 'male', '1976-06-05', 'thomas.robinson@email.com', SHA2('passwordjkl', 256), '555-109-8765', '716 Alder St', TRUE, 'profile19.jpg'),
('Dorothy', NULL, 'Clark', 'female', '1994-01-30', 'dorothy.clark@email.com', SHA2('passwordmno', 256), '555-098-7654', '817 Poplar St', TRUE, 'profile20.jpg'),
('Daniel', 'T', 'Rodriguez', 'male', '1983-12-11', 'daniel.rodriguez@email.com', SHA2('passwordpqr', 256), '555-198-7654', '918 Elm St', TRUE, 'profile21.jpg'),
('Lisa', 'U', 'Lewis', 'female', '1990-09-25', 'lisa.lewis@email.com', SHA2('passwordstu', 256), '555-298-7654', '919 Oak St', FALSE, 'profile22.jpg'),
('Paul', NULL, 'Lee', 'male', '1977-05-08', 'paul.lee@email.com', SHA2('passwordvwx', 256), '555-398-7654', '920 Pine St', TRUE, 'profile23.jpg'),
('Nancy', 'W', 'Walker', 'female', '1993-04-14', 'nancy.walker@email.com', SHA2('passwordyz1', 256), '555-498-7654', '921 Cedar St', TRUE, 'profile24.jpg'),
('Mark', 'X', 'Hall', 'male', '1982-02-27', 'mark.hall@email.com', SHA2('password234', 256), '555-598-7654', '922 Birch St', TRUE, 'profile25.jpg'),
('Sandra', NULL, 'Allen', 'female', '1986-12-20', 'sandra.allen@email.com', SHA2('password567', 256), '555-698-7654', '923 Maple St', TRUE, 'profile26.jpg'),
('Kenneth', 'Z', 'Young', 'male', '1980-10-03', 'kenneth.young@email.com', SHA2('password890', 256), '555-798-7654', '924 Spruce St', TRUE, 'profile27.jpg'),
('Helen', 'AA', 'Hernandez', 'female', '1995-07-16', 'helen.hernandez@email.com', SHA2('passwordabc', 256), '555-898-7654', '925 Walnut St', FALSE, 'profile28.jpg'),
('George', NULL, 'King', 'male', '1979-03-01', 'george.king@email.com', SHA2('passworddef', 256), '555-998-7654', '926 Cherry St', TRUE, 'profile29.jpg'),
('Donna', 'CC', 'Wright', 'female', '1988-11-09', 'donna.wright@email.com', SHA2('passwordghi', 256), '555-098-7655', '927 Aspen St', TRUE, 'profile30.jpg');


-- Insert location data for users
INSERT INTO locates (user_id, district_id, national_id) VALUES 
(1, 1, 'USA-123456789'),
(2, 3, 'USA-234567890'),
(3, 5, 'USA-345678901'),
(4, 7, 'USA-456789012'),
(5, 9, 'CAN-567890123'),
(6, 11, 'CAN-678901234'),
(7, 13, 'GBR-789012345'),
(8, 15, 'GBR-890123456'),
(9, 17, 'AUS-901234567'),
(10, 19, 'AUS-012345678'),
(11, 2, 'USA-123456780'),
(12, 4, 'USA-234567801'),
(13, 6, 'USA-345678012'),
(14, 8, 'USA-456780123'),
(15, 10, 'CAN-567801234'),
(16, 12, 'CAN-678012345'),
(17, 14, 'GBR-780123456'),
(18, 16, 'GBR-801234567'),
(19, 18, 'AUS-012345679'),
(20, 20, 'AUS-123456788'),
(21, 1, 'USA-223456789'),
(22, 3, 'USA-334567890'),
(23, 5, 'USA-445678901'),
(24, 7, 'USA-556789012'),
(25, 9, 'CAN-667890123'),
(26, 11, 'CAN-778901234'),
(27, 13, 'GBR-889012345'),
(28, 15, 'GBR-990123456'),
(29, 17, 'AUS-001234567'),
(30, 19, 'AUS-112345678');


-- Insert 4 different elections as requested
-- Election 1: Popular vote with 3 candidates and 4 groups
INSERT INTO Elections (election_name, start_date, end_date, description, status, created_at, created_by, vote_count_method, type_name, max_choices) VALUES 
('City Council Election 2025', '2025-06-01 08:00:00', '2025-06-01 20:00:00', 'Election for city council members', 'SCHEDULED', '2025-04-01 09:00:00', 1, 'POPULAR_VOTE', 'ONE_CHOICE', 1);

-- Election 2: Popular vote with max_choice=2 from 4 candidates and 3 groups
INSERT INTO Elections (election_name, start_date, end_date, description, status, created_at, created_by, vote_count_method, type_name, max_choices) VALUES 
('Election 2025', '2025-07-15 08:00:00', '2025-07-15 20:00:00', NULL, 'SCHEDULED', '2025-05-15 09:00:00', 2, 'POPULAR_VOTE', 'MULTI_CHOICE', 2);

-- Election 3: Electoral college vote with 4 groups
INSERT INTO Elections (election_name, start_date, end_date, description, status, created_at, created_by, vote_count_method, type_name, max_choices) VALUES 
('Presidential Election 2024', '2024-11-03 07:00:00', '2024-11-03 21:00:00', 'Election for president of the country', 'COMPLETED', '2024-01-15 09:00:00', 3, 'ELECTORAL_COLLEGE', 'ONE_CHOICE', 1);

-- Election 4: Referendum (popular vote)
INSERT INTO Elections (election_name, start_date, end_date, description, status, created_at, created_by, vote_count_method, type_name, max_choices) VALUES 
('Public Transit Funding Referendum', '2025-08-10 08:00:00', '2025-08-10 20:00:00', 'Referendum on increasing funding for public transportation', 'SCHEDULED', '2025-06-10 09:00:00', 4, 'POPULAR_VOTE', 'REFERENDUM', 1);

-- Insert election groups for each election
-- Election 1 groups (4 groups)
INSERT INTO ElectionGroups (election_id, group_name, score, description) VALUES
(1, 'North District', 1, 'Voters from the northern district of the city'),
(1, 'South District', 1, 'Voters from the southern district of the city'),
(1, 'East District', 1, 'Voters from the eastern district of the city'),
(1, 'West District', 1, 'Voters from the western district of the city');

-- Election 2 groups (3 groups)
INSERT INTO ElectionGroups (election_id, group_name, score, description) VALUES
(2, 'Elementary School Parents', 1, 'Parents of elementary school students'),
(2, 'Middle School Parents', 1, 'Parents of middle school students'),
(2, 'High School Parents', 1, 'Parents of high school students');

-- Election 3 groups (4 groups - electoral college)
INSERT INTO ElectionGroups (election_id, group_name, score, description) VALUES
(3, 'Western States', 55, 'Electoral votes from western states'),
(3, 'Eastern States', 70, 'Electoral votes from eastern states'),
(3, 'Northern States', 45, 'Electoral votes from northern states'),
(3, 'Southern States', 65, 'Electoral votes from southern states');

-- Election 4 groups (just one group for referendum)
INSERT INTO ElectionGroups (election_id, group_name, score, description) VALUES
(4, 'General Population', 1, 'All eligible voters');

-- Insert candidates for each election
-- Election 1: 3 candidates
INSERT INTO Candidates (user_id, election_id, party, bio, campaign_platform, photo_url, is_referendum_option, option_label) VALUES
(1, 1, 'Progressive Party', 'Lifelong resident with 10 years of public service experience', 'Focus on sustainable development and affordable housing', 'candidate1.jpg', FALSE, NULL),
(2, 1, 'Conservative Union', 'Business owner and community volunteer', 'Fiscal responsibility and public safety', 'candidate2.jpg', FALSE, NULL),
(3, 1, 'Independent Coalition', 'Former teacher and neighborhood advocate', 'Education funding and infrastructure improvement', 'candidate3.jpg', FALSE, NULL);

-- Election 2: 4 candidates (multi-choice, choose 2)
INSERT INTO Candidates (user_id, election_id, party, bio, campaign_platform, photo_url, is_referendum_option, option_label) VALUES
(4, 2, 'Education First', 'School administrator with 15 years experience', 'Curriculum reform and teacher support', 'candidate4.jpg', FALSE, NULL),
(5, 2, 'Parents Alliance', 'PTA president and education activist', 'Parent involvement and extracurricular activities', 'candidate5.jpg', FALSE, NULL),
(6, 2, 'Community Voice', 'Local business owner and education donor', 'Public-private partnerships for schools', 'candidate6.jpg', FALSE, NULL),
(7, 2, 'Future Focus', 'Former principal and education policy expert', 'Technology integration and career readiness', 'candidate7.jpg', FALSE, NULL);

-- Election 3: 4 candidates (electoral college)
INSERT INTO Candidates (user_id, election_id, party, bio, campaign_platform, photo_url, is_referendum_option, option_label) VALUES
(8, 3, 'Liberal Party', 'Current senator with legislative experience', 'Healthcare reform and environmental protection', 'candidate8.jpg', FALSE, NULL),
(9, 3, 'Conservative Party', 'State governor and former business executive', 'Economic growth and traditional values', 'candidate9.jpg', FALSE, NULL),
(10, 3, 'Reform Party', 'Entrepreneur and political outsider', 'Government efficiency and technological innovation', 'candidate10.jpg', FALSE, NULL),
(11, 3, 'Green Alliance', 'Environmental scientist and community organizer', 'Climate action and sustainable development', 'candidate11.jpg', FALSE, NULL);

-- Election 4: Referendum options (Yes/No)
INSERT INTO Candidates (user_id, election_id, party, bio, campaign_platform, photo_url, is_referendum_option, option_label) VALUES
(NULL, 4, NULL, NULL, 'Increase sales tax by 0.5% to fund public transit improvements', NULL, TRUE, 'Yes'),
(NULL, 4, NULL, NULL, 'Keep current funding levels with no tax increase', NULL, TRUE, 'No');

