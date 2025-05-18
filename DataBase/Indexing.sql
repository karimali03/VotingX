USE voting_system;

-- Create necessary indexes for performance

-- Indexes for Elections table
CREATE INDEX idx_election_status ON Elections(status);
CREATE INDEX idx_election_dates ON Elections(start_date, end_date);

-- Indexes for ElectionGroups table
CREATE INDEX idx_election_group_name ON ElectionGroups(group_name);

-- Indexes for GroupDistricts table
CREATE INDEX idx_group_districts ON GroupDistricts(group_id, district_id);

-- Indexes for Candidates table
CREATE INDEX idx_candidate_user ON Candidates(user_id);
CREATE INDEX idx_candidate_election ON Candidates(election_id);

-- Indexes for VoteDetails table
CREATE INDEX idx_vote_hashed_user ON VoteDetails(hashed_user_id);
CREATE INDEX idx_vote_group ON VoteDetails(group_id);

-- Indexes for encrypted_candidates table
CREATE INDEX idx_encrypted_candidate ON encrypted_candidates(encrypted_candidate);

-- Indexes for ElectionResultsPerGroup table
CREATE INDEX idx_results_group_candidate ON ElectionResultsPerGroup(group_id, candidate_id);

-- Indexes for ElectionResults table
CREATE INDEX idx_results_candidate ON ElectionResults(candidate_id);

