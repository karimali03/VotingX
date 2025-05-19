import Country from '../models/countries.model.js';
import City from '../models/cities.model.js';
import StateGovernorate from '../models/states_governorates.model.js';
import asyncFun from '../middlewares/async.function.js';
import { connectToDatabase } from '../config/database.js';
import Locate from '../models/locates.model.js';
import User from '../models/user.model.js';
import District from '../models/districts.model.js';

class LocationController {
    // Country Controllers
    static getAllCountries = asyncFun(async (req, res) => {
        const connection = await connectToDatabase();
        const [countries] = await connection.execute(`SELECT * FROM Countries`);
        res.status(200).send({
            message: "Countries retrieved successfully",
            data: countries
        });
    });

    static getCountryByCode = asyncFun(async (req, res) => {
        const connection = await connectToDatabase();
        const [rows] = await connection.execute(
            `SELECT * FROM Countries WHERE code = ?`,
            [req.params.code]
        );
        const country = rows[0];

        if (!country) {
            return res.status(404).send({
                message: "Country not found",
                data: null
            });
        }
        res.status(200).send({
            message: "Country found",
            data: country
        });
    });

    // Governorate Controllers
    static getAllGovernorates = asyncFun(async (req, res) => {
        const connection = await connectToDatabase();
        const [governorates] = await connection.execute(`SELECT * FROM States_Governorates`);
        res.status(200).send({
            message: "Governorates retrieved successfully",
            data: governorates
        });
    });

    static getGovernorateById = asyncFun(async (req, res) => {
        const connection = await connectToDatabase();
        const [rows] = await connection.execute(
            `SELECT * FROM States_Governorates WHERE id = ?`,
            [req.params.id]
        );
        const governorate = rows[0];

        if (!governorate) {
            return res.status(404).send({
                message: "Governorate not found",
                data: null
            });
        }
        res.status(200).send({
            message: "Governorate found",
            data: governorate
        });
    });

    static getGovernoratesByCountry = asyncFun(async (req, res) => {
        const connection = await connectToDatabase();
        const [governorates] = await connection.execute(
            `SELECT * FROM States_Governorates WHERE country_code = ?`,
            [req.params.countryCode]
        );

        // Check if country exists first
        const [countries] = await connection.execute(
            `SELECT * FROM Countries WHERE code = ?`,
            [req.params.countryCode]
        );

        if (countries.length === 0) {
            return res.status(404).send({
                message: "Country not found",
                data: null
            });
        }

        res.status(200).send({
            message: "Governorates retrieved successfully",
            data: governorates
        });
    });

    // City Controllers
    static getAllCities = asyncFun(async (req, res) => {
        const connection = await connectToDatabase();
        const [cities] = await connection.execute(`SELECT * FROM Cities`);
        res.status(200).send({
            message: "Cities retrieved successfully",
            data: cities
        });
    });

    static getCityById = asyncFun(async (req, res) => {
        const connection = await connectToDatabase();
        const [rows] = await connection.execute(
            `SELECT * FROM Cities WHERE id = ?`,
            [req.params.id]
        );
        const city = rows[0];

        if (!city) {
            return res.status(404).send({
                message: "City not found",
                data: null
            });
        }
        res.status(200).send({
            message: "City found",
            data: city
        });
    });

    static getCitiesByGovernorate = asyncFun(async (req, res) => {
        const connection = await connectToDatabase();

        // Check if governorate exists first
        const [governorates] = await connection.execute(
            `SELECT * FROM States_Governorates WHERE id = ?`,
            [req.params.governorateId]
        );

        if (governorates.length === 0) {
            return res.status(404).send({
                message: "Governorate not found",
                data: null
            });
        }

        const [cities] = await connection.execute(
            `SELECT * FROM Cities WHERE states_governorates_id = ?`,
            [req.params.governorateId]
        );

        res.status(200).send({
            message: "Cities retrieved successfully",
            data: cities
        });
    });

    static getCitiesByCountry = asyncFun(async (req, res) => {
        const connection = await connectToDatabase();

        // Check if country exists first
        const [countries] = await connection.execute(
            `SELECT * FROM Countries WHERE code = ?`,
            [req.params.countryCode]
        );

        if (countries.length === 0) {
            return res.status(404).send({
                message: "Country not found",
                data: null
            });
        }

        const [cities] = await connection.execute(
            `SELECT c.* FROM Cities c 
             JOIN States_Governorates sg ON c.states_governorates_id = sg.id 
             WHERE sg.country_code = ?`,
            [req.params.countryCode]
        );

        res.status(200).send({
            message: "Cities retrieved successfully",
            data: cities
        });
    });

    // New nested routes methods
    static getCountryGovernorateById = asyncFun(async (req, res) => {
        const connection = await connectToDatabase();

        // Check if country exists
        const [countries] = await connection.execute(
            `SELECT * FROM Countries WHERE code = ?`,
            [req.params.countryCode]
        );

        if (countries.length === 0) {
            return res.status(404).send({
                message: "Country not found",
                data: null
            });
        }

        // Get governorate details
        const [governorates] = await connection.execute(
            `SELECT * FROM States_Governorates WHERE country_code = ? AND id = ?`,
            [req.params.countryCode, req.params.governorateId]
        );

        const governorate = governorates[0];
        if (!governorate) {
            return res.status(404).send({
                message: "Governorate not found in this country",
                data: null
            });
        }

        res.status(200).send({
            message: "Governorate details retrieved successfully",
            data: {
                ...governorate,
                country: countries[0]
            }
        });
    });

    static getGovernorateDistrictsById = asyncFun(async (req, res) => {
        const connection = await connectToDatabase();

        // Check if governorate exists
        const [governorates] = await connection.execute(
            `SELECT * FROM States_Governorates WHERE id = ?`,
            [req.params.governorateId]
        );

        if (governorates.length === 0) {
            return res.status(404).send({
                message: "Governorate not found",
                data: null
            });
        }

        // Get districts through cities
        const [districts] = await connection.execute(
            `SELECT DISTINCT d.* 
             FROM Districts d
             JOIN Cities c ON d.city_id = c.id
             WHERE c.states_governorates_id = ?`,
            [req.params.governorateId]
        );

        res.status(200).send({
            message: "Districts retrieved successfully",
            data: {
                governorate: governorates[0],
                districts: districts
            }
        });
    });

    static getCityDistricts = asyncFun(async (req, res) => {
        const connection = await connectToDatabase();

        // Check if city exists
        const [cities] = await connection.execute(
            `SELECT c.*, sg.name as governorate_name, sg.country_code 
             FROM Cities c
             JOIN States_Governorates sg ON c.states_governorates_id = sg.id
             WHERE c.id = ?`,
            [req.params.cityId]
        );

        if (cities.length === 0) {
            return res.status(404).send({
                message: "City not found",
                data: null
            });
        }

        // Get districts
        const [districts] = await connection.execute(
            `SELECT * FROM Districts WHERE city_id = ?`,
            [req.params.cityId]
        );

        res.status(200).send({
            message: "Districts retrieved successfully",
            data: {
                city: cities[0],
                districts: districts
            }
        });
    });

    static getDistrictDetails = asyncFun(async (req, res) => {
        const connection = await connectToDatabase();

        // Get complete district details with city and governorate info
        const [districts] = await connection.execute(
            `SELECT d.*, c.name as city_name, c.states_governorates_id,
                    sg.name as governorate_name, sg.country_code,
                    co.name as country_name
             FROM Districts d
             JOIN Cities c ON d.city_id = c.id
             JOIN States_Governorates sg ON c.states_governorates_id = sg.id
             JOIN Countries co ON sg.country_code = co.code
             WHERE d.id = ?`,
            [req.params.districtId]
        );

        if (districts.length === 0) {
            return res.status(404).send({
                message: "District not found",
                data: null
            });
        }

        res.status(200).send({
            message: "District details retrieved successfully",
            data: districts[0]
        });
    });

    // Get full hierarchy for a country
    static getCountryHierarchy = asyncFun(async (req, res) => {
        const connection = await connectToDatabase();

        // Get country details
        const [countries] = await connection.execute(
            `SELECT * FROM Countries WHERE code = ?`,
            [req.params.countryCode]
        );

        if (countries.length === 0) {
            return res.status(404).send({
                message: "Country not found",
                data: null
            });
        }

        // Get governorates
        const [governorates] = await connection.execute(
            `SELECT * FROM States_Governorates WHERE country_code = ?`,
            [req.params.countryCode]
        );

        // Get cities for each governorate
        const governoratesWithCities = await Promise.all(governorates.map(async (governorate) => {
            const [cities] = await connection.execute(
                `SELECT * FROM Cities WHERE states_governorates_id = ?`,
                [governorate.id]
            );

            // Get districts for each city
            const citiesWithDistricts = await Promise.all(cities.map(async (city) => {
                const [districts] = await connection.execute(
                    `SELECT * FROM Districts WHERE city_id = ?`,
                    [city.id]
                );
                return {
                    ...city,
                    districts: districts
                };
            }));

            return {
                ...governorate,
                cities: citiesWithDistricts
            };
        }));

        res.status(200).send({
            message: "Country hierarchy retrieved successfully",
            data: {
                ...countries[0],
                governorates: governoratesWithCities
            }
        });
    });

    // Get full hierarchy for a governorate
    static getGovernorateHierarchy = asyncFun(async (req, res) => {
        const connection = await connectToDatabase();

        // Get governorate details with country info
        const [governorates] = await connection.execute(
            `SELECT sg.*, c.name as country_name 
             FROM States_Governorates sg
             JOIN Countries c ON sg.country_code = c.code
             WHERE sg.id = ?`,
            [req.params.governorateId]
        );

        if (governorates.length === 0) {
            return res.status(404).send({
                message: "Governorate not found",
                data: null
            });
        }

        // Get cities
        const [cities] = await connection.execute(
            `SELECT * FROM Cities WHERE states_governorates_id = ?`,
            [req.params.governorateId]
        );

        // Get districts for each city
        const citiesWithDistricts = await Promise.all(cities.map(async (city) => {
            const [districts] = await connection.execute(
                `SELECT * FROM Districts WHERE city_id = ?`,
                [city.id]
            );
            return {
                ...city,
                districts: districts
            };
        }));

        res.status(200).send({
            message: "Governorate hierarchy retrieved successfully",
            data: {
                ...governorates[0],
                cities: citiesWithDistricts
            }
        });
    });

    // Get full hierarchy for a city
    static getCityHierarchy = asyncFun(async (req, res) => {
        const connection = await connectToDatabase();

        // Get city details with governorate and country info
        const [cities] = await connection.execute(
            `SELECT c.*, sg.name as governorate_name, sg.country_code,
                    co.name as country_name
             FROM Cities c
             JOIN States_Governorates sg ON c.states_governorates_id = sg.id
             JOIN Countries co ON sg.country_code = co.code
             WHERE c.id = ?`,
            [req.params.cityId]
        );

        if (cities.length === 0) {
            return res.status(404).send({
                message: "City not found",
                data: null
            });
        }

        // Get districts
        const [districts] = await connection.execute(
            `SELECT * FROM Districts WHERE city_id = ?`,
            [req.params.cityId]
        );

        res.status(200).send({
            message: "City hierarchy retrieved successfully",
            data: {
                ...cities[0],
                districts: districts
            }
        });
    });

    // Get full hierarchy for a district
    static getDistrictHierarchy = asyncFun(async (req, res) => {
        const connection = await connectToDatabase();

        // Get complete district details with full hierarchy
        const [districts] = await connection.execute(
            `SELECT d.*, 
                    c.name as city_name, c.states_governorates_id,
                    sg.name as governorate_name, sg.country_code,
                    co.name as country_name
             FROM Districts d
             JOIN Cities c ON d.city_id = c.id
             JOIN States_Governorates sg ON c.states_governorates_id = sg.id
             JOIN Countries co ON sg.country_code = co.code
             WHERE d.id = ?`,
            [req.params.districtId]
        );

        if (districts.length === 0) {
            return res.status(404).send({
                message: "District not found",
                data: null
            });
        }

        const district = districts[0];

        // Restructure the data to show clear hierarchy
        const hierarchicalData = {
            district: {
                id: district.id,
                name: district.name
            },
            city: {
                id: district.city_id,
                name: district.city_name
            },
            governorate: {
                id: district.states_governorates_id,
                name: district.governorate_name
            },
            country: {
                code: district.country_code,
                name: district.country_name
            }
        };

        res.status(200).send({
            message: "District hierarchy retrieved successfully",
            data: hierarchicalData
        });
    });

    // Country -> Governorate -> City -> District hierarchy
    static getCountryGovernorateCities = asyncFun(async (req, res) => {
        const connection = await connectToDatabase();
        const { countryCode, governorateId } = req.params;

        // Verify country exists
        const [countries] = await connection.execute(
            `SELECT * FROM Countries WHERE code = ?`,
            [countryCode]
        );
        if (countries.length === 0) {
            return res.status(404).send({
                message: "Country not found",
                data: null
            });
        }

        // Verify governorate exists and belongs to country
        const [governorates] = await connection.execute(
            `SELECT * FROM States_Governorates 
             WHERE id = ? AND country_code = ?`,
            [governorateId, countryCode]
        );
        if (governorates.length === 0) {
            return res.status(404).send({
                message: "Governorate not found in this country",
                data: null
            });
        }

        // Get cities
        const [cities] = await connection.execute(
            `SELECT * FROM Cities WHERE states_governorates_id = ?`,
            [governorateId]
        );

        res.status(200).send({
            message: "Cities retrieved successfully",
            data: {
                country: countries[0],
                governorate: governorates[0],
                cities: cities
            }
        });
    });

    static getCountryGovernorateCityById = asyncFun(async (req, res) => {
        const connection = await connectToDatabase();
        const { countryCode, governorateId, cityId } = req.params;

        // Get complete hierarchy in one query
        const [results] = await connection.execute(
            `SELECT c.*, sg.name as governorate_name, co.name as country_name
             FROM Cities c
             JOIN States_Governorates sg ON c.states_governorates_id = sg.id
             JOIN Countries co ON sg.country_code = co.code
             WHERE co.code = ? AND sg.id = ? AND c.id = ?`,
            [countryCode, governorateId, cityId]
        );

        if (results.length === 0) {
            return res.status(404).send({
                message: "City not found in this hierarchy",
                data: null
            });
        }

        res.status(200).send({
            message: "City retrieved successfully",
            data: {
                city: {
                    id: results[0].id,
                    name: results[0].name
                },
                governorate: {
                    id: governorateId,
                    name: results[0].governorate_name
                },
                country: {
                    code: countryCode,
                    name: results[0].country_name
                }
            }
        });
    });

    static getCountryGovernorateCityDistricts = asyncFun(async (req, res) => {
        const connection = await connectToDatabase();
        const { countryCode, governorateId, cityId } = req.params;

        // Verify the complete hierarchy exists
        const [hierarchy] = await connection.execute(
            `SELECT c.*, sg.name as governorate_name, 
                    sg.country_code, co.name as country_name
             FROM Cities c
             JOIN States_Governorates sg ON c.states_governorates_id = sg.id
             JOIN Countries co ON sg.country_code = co.code
             WHERE co.code = ? AND sg.id = ? AND c.id = ?`,
            [countryCode, governorateId, cityId]
        );

        if (hierarchy.length === 0) {
            return res.status(404).send({
                message: "Invalid hierarchy path",
                data: null
            });
        }

        // Get districts
        const [districts] = await connection.execute(
            `SELECT * FROM Districts WHERE city_id = ?`,
            [cityId]
        );

        res.status(200).send({
            message: "Districts retrieved successfully",
            data: {
                country: {
                    code: countryCode,
                    name: hierarchy[0].country_name
                },
                governorate: {
                    id: governorateId,
                    name: hierarchy[0].governorate_name
                },
                city: {
                    id: cityId,
                    name: hierarchy[0].name
                },
                districts: districts
            }
        });
    });

    static getCountryGovernorateCityDistrictById = asyncFun(async (req, res) => {
        const connection = await connectToDatabase();
        const { countryCode, governorateId, cityId, districtId } = req.params;

        // Get complete hierarchy in one query
        const [results] = await connection.execute(
            `SELECT d.*, c.name as city_name, 
                    sg.name as governorate_name, 
                    sg.country_code, co.name as country_name
             FROM Districts d
             JOIN Cities c ON d.city_id = c.id
             JOIN States_Governorates sg ON c.states_governorates_id = sg.id
             JOIN Countries co ON sg.country_code = co.code
             WHERE co.code = ? AND sg.id = ? AND c.id = ? AND d.id = ?`,
            [countryCode, governorateId, cityId, districtId]
        );

        if (results.length === 0) {
            return res.status(404).send({
                message: "District not found in this hierarchy",
                data: null
            });
        }

        res.status(200).send({
            message: "District retrieved successfully",
            data: {
                district: {
                    id: results[0].id,
                    name: results[0].name
                },
                city: {
                    id: cityId,
                    name: results[0].city_name
                },
                governorate: {
                    id: governorateId,
                    name: results[0].governorate_name
                },
                country: {
                    code: countryCode,
                    name: results[0].country_name
                }
            }
        });
    });

    // Governorate -> City -> District hierarchy
    static getGovernorateCities = asyncFun(async (req, res) => {
        const connection = await connectToDatabase();
        const { governorateId } = req.params;

        // Get governorate with its country
        const [governorates] = await connection.execute(
            `SELECT sg.*, c.name as country_name
             FROM States_Governorates sg
             JOIN Countries c ON sg.country_code = c.code
             WHERE sg.id = ?`,
            [governorateId]
        );

        if (governorates.length === 0) {
            return res.status(404).send({
                message: "Governorate not found",
                data: null
            });
        }

        // Get cities
        const [cities] = await connection.execute(
            `SELECT * FROM Cities WHERE states_governorates_id = ?`,
            [governorateId]
        );

        res.status(200).send({
            message: "Cities retrieved successfully",
            data: {
                governorate: {
                    id: governorates[0].id,
                    name: governorates[0].name
                },
                country: {
                    code: governorates[0].country_code,
                    name: governorates[0].country_name
                },
                cities: cities
            }
        });
    });

    static getGovernorateCityById = asyncFun(async (req, res) => {
        const connection = await connectToDatabase();
        const { governorateId, cityId } = req.params;

        // Get complete hierarchy
        const [results] = await connection.execute(
            `SELECT c.*, sg.name as governorate_name, 
                    sg.country_code, co.name as country_name
             FROM Cities c
             JOIN States_Governorates sg ON c.states_governorates_id = sg.id
             JOIN Countries co ON sg.country_code = co.code
             WHERE sg.id = ? AND c.id = ?`,
            [governorateId, cityId]
        );

        if (results.length === 0) {
            return res.status(404).send({
                message: "City not found in this governorate",
                data: null
            });
        }

        res.status(200).send({
            message: "City retrieved successfully",
            data: {
                city: {
                    id: results[0].id,
                    name: results[0].name
                },
                governorate: {
                    id: governorateId,
                    name: results[0].governorate_name
                },
                country: {
                    code: results[0].country_code,
                    name: results[0].country_name
                }
            }
        });
    });

    static getGovernorateCityDistricts = asyncFun(async (req, res) => {
        const connection = await connectToDatabase();
        const { governorateId, cityId } = req.params;

        // Verify hierarchy and get details
        const [hierarchy] = await connection.execute(
            `SELECT c.*, sg.name as governorate_name, 
                    sg.country_code, co.name as country_name
             FROM Cities c
             JOIN States_Governorates sg ON c.states_governorates_id = sg.id
             JOIN Countries co ON sg.country_code = co.code
             WHERE sg.id = ? AND c.id = ?`,
            [governorateId, cityId]
        );

        if (hierarchy.length === 0) {
            return res.status(404).send({
                message: "Invalid hierarchy path",
                data: null
            });
        }

        // Get districts
        const [districts] = await connection.execute(
            `SELECT * FROM Districts WHERE city_id = ?`,
            [cityId]
        );

        res.status(200).send({
            message: "Districts retrieved successfully",
            data: {
                city: {
                    id: cityId,
                    name: hierarchy[0].name
                },
                governorate: {
                    id: governorateId,
                    name: hierarchy[0].governorate_name
                },
                country: {
                    code: hierarchy[0].country_code,
                    name: hierarchy[0].country_name
                },
                districts: districts
            }
        });
    });

    static getGovernorateCityDistrictById = asyncFun(async (req, res) => {
        const connection = await connectToDatabase();
        const { governorateId, cityId, districtId } = req.params;

        // Get complete hierarchy
        const [results] = await connection.execute(
            `SELECT d.*, c.name as city_name, 
                    sg.name as governorate_name, 
                    sg.country_code, co.name as country_name
             FROM Districts d
             JOIN Cities c ON d.city_id = c.id
             JOIN States_Governorates sg ON c.states_governorates_id = sg.id
             JOIN Countries co ON sg.country_code = co.code
             WHERE sg.id = ? AND c.id = ? AND d.id = ?`,
            [governorateId, cityId, districtId]
        );

        if (results.length === 0) {
            return res.status(404).send({
                message: "District not found in this hierarchy",
                data: null
            });
        }

        res.status(200).send({
            message: "District retrieved successfully",
            data: {
                district: {
                    id: results[0].id,
                    name: results[0].name
                },
                city: {
                    id: cityId,
                    name: results[0].city_name
                },
                governorate: {
                    id: governorateId,
                    name: results[0].governorate_name
                },
                country: {
                    code: results[0].country_code,
                    name: results[0].country_name
                }
            }
        });
    });

    // Basic list methods
    static getAllDistricts = asyncFun(async (req, res) => {
        const connection = await connectToDatabase();
        const [districts] = await connection.execute(`SELECT * FROM Districts`);
        res.status(200).send({
            message: "Districts retrieved successfully",
            data: districts
        });
    });
}

export default LocationController; 