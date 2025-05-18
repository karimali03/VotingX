import express from 'express';
import Country from '../models/countries.model.js';

const router = express.Router();

// Create a new country
router.post('/countries', async (req, res) => {
    try {
        await Country.createCountry(req.body);
        res.status(201).send({ message: 'Country created successfully.' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Get all countries
router.get('/countries', async (req, res) => {
    try {
        const countries = await Country.getAllCountries();
        res.status(200).send(countries);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Get a country by ID
router.get('/countries/:id', async (req, res) => {
    try {
        const country = await Country.getCountryById(req.params.id);
        if (!country) {
            return res.status(404).send({ message: 'Country not found.' });
        }
        res.status(200).send(country);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Delete a country
router.delete('/countries/:id', async (req, res) => {
    try {
        await Country.deleteCountry(req.params.id);
        res.status(200).send({ message: 'Country deleted successfully.' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

export default router;