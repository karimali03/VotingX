DROP TABLE IF EXISTS Temp;

-- Create a temporary table to store data from egypt.csv
CREATE TEMPORARY TABLE Temp (
    governorate VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL
);

LOAD DATA INFILE '/var/lib/mysql-files/egypt.csv'
INTO TABLE Temp
FIELDS TERMINATED BY ',' 
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(governorate, city, district);

insert into Countries(code , name) 
values
('EGY', 'Egypt');

INSERT INTO States_Governorates (name, country_code)
SELECT DISTINCT governorate, 'EGY'
FROM Temp
WHERE governorate IS NOT NULL;

INSERT INTO Cities (name, states_governorates_id)
SELECT DISTINCT city, s.id
FROM Temp t
JOIN States_Governorates s ON t.governorate = s.name
WHERE t.city IS NOT NULL
AND s.country_code = 'EGY';

INSERT INTO Districts (name, city_id)   
SELECT DISTINCT district, c.id
FROM Temp t
JOIN Cities c ON t.city = c.name
JOIN States_Governorates s ON c.states_governorates_id = s.id
WHERE t.district IS NOT NULL
AND s.country_code = 'EGY';


SELECT *
FROM Countries co
JOIN States_Governorates s ON co.code = s.country_code
JOIN Cities c ON c.states_governorates_id = s.id
JOIN Districts d ON d.city_id = c.id
WHERE co.code = 'EGY';