import express from 'express';
import LocationController from '../controllers/location.controller.js';

const router = express.Router();

// Basic routes for individual entities
router.get('/countries', LocationController.getAllCountries);
router.get('/countries/:code', LocationController.getCountryByCode);
router.get('/countries/:countryCode/governorates', LocationController.getGovernoratesByCountry);
router.get('/governorates', LocationController.getAllGovernorates);
router.get('/cities', LocationController.getAllCities);
router.get('/districts', LocationController.getAllDistricts);

// Deeply nested hierarchical routes from country
router.get('/countries/:countryCode/governorates/:governorateId', LocationController.getCountryGovernorateById);
router.get('/countries/:countryCode/governorates/:governorateId/cities', LocationController.getCountryGovernorateCities);
router.get('/countries/:countryCode/governorates/:governorateId/cities/:cityId', LocationController.getCountryGovernorateCityById);
router.get('/countries/:countryCode/governorates/:governorateId/cities/:cityId/districts', LocationController.getCountryGovernorateCityDistricts);
router.get('/countries/:countryCode/governorates/:governorateId/cities/:cityId/districts/:districtId', LocationController.getCountryGovernorateCityDistrictById);

// Deeply nested hierarchical routes from governorate
router.get('/governorates/:governorateId/cities', LocationController.getGovernorateCities);
router.get('/governorates/:governorateId/cities/:cityId', LocationController.getGovernorateCityById);
router.get('/governorates/:governorateId/cities/:cityId/districts', LocationController.getGovernorateCityDistricts);
router.get('/governorates/:governorateId/cities/:cityId/districts/:districtId', LocationController.getGovernorateCityDistrictById);

export default router; 