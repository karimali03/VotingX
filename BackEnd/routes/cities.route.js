import express from 'express';
import City from '../models/cities.model.js';

const router = express.Router();

// Create a new city
router.post('/cities', async (req, res) => {
    try {
        await City.createCity(req.body);
        res.status(201).send({ message: 'City created successfully.' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Get all cities
router.get('/cities', async (req, res) => {
    try {
        const cities = await City.getAllCities();
        res.status(200).send(cities);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Get a city by ID
router.get('/cities/:id', async (req, res) => {
    try {
        const city = await City.getCityById(req.params.id);
        if (!city) {
            return res.status(404).send({ message: 'City not found.' });
        }
        res.status(200).send(city);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Delete a city
router.delete('/cities/:id', async (req, res) => {
    try {
        await City.deleteCity(req.params.id);
        res.status(200).send({ message: 'City deleted successfully.' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

export default router;