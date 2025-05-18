import express from 'express';
import District from '../models/districts.model.js';

const router = express.Router();

// Create a new district
router.post('/districts', async (req, res) => {
    try {
        await District.createDistrict(req.body);
        res.status(201).send({ message: 'District created successfully.' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Get all districts
router.get('/districts', async (req, res) => {
    try {
        const districts = await District.getAllDistricts();
        res.status(200).send(districts);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Get a district by ID
router.get('/districts/:id', async (req, res) => {
    try {
        const district = await District.getDistrictById(req.params.id);
        if (!district) {
            return res.status(404).send({ message: 'District not found.' });
        }
        res.status(200).send(district);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Delete a district
router.delete('/districts/:id', async (req, res) => {
    try {
        await District.deleteDistrict(req.params.id);
        res.status(200).send({ message: 'District deleted successfully.' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

export default router;