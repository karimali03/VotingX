import express from 'express';
import GroupDistrict from '../models/group_districts.model.js';

const router = express.Router();

// Create a new group district
router.post('/group-districts', async (req, res) => {
    try {
        await GroupDistrict.createGroupDistrict(req.body);
        res.status(201).send({ message: 'Group district created successfully.' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Get all group districts
router.get('/group-districts', async (req, res) => {
    try {
        const districts = await GroupDistrict.getAllGroupDistricts();
        res.status(200).send(districts);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Get a group district by ID
router.get('/group-districts/:id', async (req, res) => {
    try {
        const district = await GroupDistrict.getGroupDistrictById(req.params.id);
        if (!district) {
            return res.status(404).send({ message: 'Group district not found.' });
        }
        res.status(200).send(district);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Delete a group district
router.delete('/group-districts/:id', async (req, res) => {
    try {
        await GroupDistrict.deleteGroupDistrict(req.params.id);
        res.status(200).send({ message: 'Group district deleted successfully.' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

export default router;