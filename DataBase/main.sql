-- Database creation
DROP DATABASE IF EXISTS voting_system;
CREATE DATABASE voting_system;
USE voting_system;

-- Table creation
source ./UserSchema.sql;
source ./ElectionSchema.sql;

source ./Indexing.sql;

source ./InsertingUsers.sql

source ./TestPopularOneChoice.sql;
source ./TestPopularMultiChoise.sql;
source ./TestElectoral.sql;
source ./TestReferendum.sql;


source ./ElectionResultsProcedures.sql;
source ./get_procedures.sql;


source  ./test.sql;

source ./InsertingCountries.sql;
