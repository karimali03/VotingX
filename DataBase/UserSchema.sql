USE voting_system;

-- Geographic hierarchy tables
CREATE TABLE Countries (
    code VARCHAR(3) PRIMARY KEY COMMENT 'Country code (ISO)',
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE States_Governorates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    country_code VARCHAR(3) NOT NULL,
    FOREIGN KEY (country_code) REFERENCES Countries(code) ON DELETE CASCADE,
    UNIQUE KEY (country_code, name)
);

CREATE TABLE Cities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    states_governorates_id INT NOT NULL,
    FOREIGN KEY (states_governorates_id) REFERENCES States_Governorates(id) ON DELETE CASCADE,
    UNIQUE KEY (states_governorates_id, name)
);

CREATE TABLE Districts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    city_id INT NOT NULL,
    FOREIGN KEY (city_id) REFERENCES Cities(id) ON DELETE CASCADE,
    UNIQUE KEY (city_id, name)
);

CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    middle_name VARCHAR(50),
    role ENUM('user','admin') NOT NULL DEFAULT 'user',
    last_name VARCHAR(50) NOT NULL,
    gender ENUM('male', 'female') NOT NULL,
    birth_date DATE NOT NULL,
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    current_address VARCHAR(255),
    account_verified BOOLEAN DEFAULT FALSE,
    profile_image VARCHAR(255)
);

-- The address listed below is the permanent address as registered on the national ID card of each nationality held by the individual.
CREATE TABLE locates (
    user_id INT NOT NULL,
    district_id INT NOT NULL,
    national_id VARCHAR(20) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (district_id) REFERENCES Districts(id) ON DELETE CASCADE,
    PRIMARY KEY (district_id, national_id)
);

select 'user ok';