USE voting_system;

-- Election system tables
CREATE TABLE Elections (

    id INT AUTO_INCREMENT PRIMARY KEY,
    election_name VARCHAR(100) NOT NULL,
    start_date DATETIME NOT NULL,
    end_date DATETIME NOT NULL,
    description TEXT,
    status ENUM('SCHEDULED', 'ACTIVE', 'COMPLETED', 'CANCELLED') DEFAULT 'SCHEDULED',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT,

    -- For calculation
    vote_count_method ENUM('ELECTORAL_COLLEGE', 'POPULAR_VOTE') NOT NULL,
    type_name ENUM('ONE_CHOICE', 'MULTI_CHOICE', 'REFERENDUM') NOT NULL,
    max_choices INT DEFAULT 1 NOT NULL,
    
    FOREIGN KEY (created_by) REFERENCES Users(id) ON DELETE SET NULL,

    CHECK (end_date > start_date),

    CHECK (
        (type_name = 'MULTI_CHOICE' AND max_choices > 1) OR
        (type_name != 'MULTI_CHOICE' AND max_choices = 1)
    ),
    CHECK (
        (vote_count_method = 'ELECTORAL_COLLEGE' AND max_choices = 1) OR
        (vote_count_method = 'POPULAR_VOTE')
    )
);

CREATE TABLE ElectionGroups (
    id INT AUTO_INCREMENT PRIMARY KEY,
    election_id INT NOT NULL,
    group_name VARCHAR(100) NOT NULL,
    score INT DEFAULT 1,
    description TEXT,
    FOREIGN KEY (election_id) REFERENCES Elections(id) ON DELETE CASCADE,
    UNIQUE KEY (election_id, group_name)
);

CREATE TABLE GroupDistricts (
    group_id INT NOT NULL,
    district_id INT NOT NULL,
    election_id INT NOT NULL,
    FOREIGN KEY (election_id) REFERENCES Elections(id) ON DELETE CASCADE,
    FOREIGN KEY (group_id) REFERENCES ElectionGroups(id) ON DELETE CASCADE,
    FOREIGN KEY (district_id) REFERENCES Districts(id) ON DELETE CASCADE,
    PRIMARY KEY (district_id, election_id)
);

CREATE TABLE Candidates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT COMMENT 'Can be NULL for referendum options',
    election_id INT NOT NULL,
    party VARCHAR(100),
    bio TEXT,
    campaign_platform TEXT,
    photo_url VARCHAR(255),
    is_referendum_option BOOLEAN DEFAULT FALSE,
    option_label VARCHAR(50) DEFAULT NULL COMMENT 'For referendums (e.g., "Yes", "No")',
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (election_id) REFERENCES Elections(id) ON DELETE CASCADE,
    CHECK (
        (is_referendum_option = FALSE AND user_id IS NOT NULL) OR
        (is_referendum_option = TRUE AND option_label IS NOT NULL)
    ),
    UNIQUE (election_id, user_id)
);

CREATE TABLE VoteDetails (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hashed_user_id VARCHAR(255) NOT NULL,
    group_id INT NOT NULL COMMENT 'The group the voter belongs to',
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (group_id) REFERENCES ElectionGroups(id) ON DELETE CASCADE
);

CREATE TABLE encrypted_candidates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    vote_id INT NOT NULL,
    encrypted_candidate VARCHAR(255) NOT NULL,
    iv VARBINARY(16),
    FOREIGN KEY (vote_id) REFERENCES VoteDetails(id) ON DELETE CASCADE,
    UNIQUE KEY (vote_id, encrypted_candidate)
);

CREATE TABLE ElectionResultsPerGroup (
    id INT AUTO_INCREMENT PRIMARY KEY,
    group_id INT,
    candidate_id INT NOT NULL,
    vote_count INT NOT NULL DEFAULT 0,
    percentage DECIMAL(5,2) COMMENT 'Percentage of votes',
    calculation_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (group_id) REFERENCES ElectionGroups(id) ON DELETE SET NULL,
    FOREIGN KEY (candidate_id) REFERENCES Candidates(id) ON DELETE CASCADE
);

CREATE TABLE ElectionResults (
	id INT AUTO_INCREMENT PRIMARY KEY,
    candidate_id INT NOT NULL,
    vote_count INT NOT NULL DEFAULT 0,
    percentage DECIMAL(5,2) COMMENT 'Percentage of votes',
    is_winner BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (candidate_id) REFERENCES Candidates(id) ON DELETE CASCADE
);


select 'election ok';
