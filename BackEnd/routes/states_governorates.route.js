import express from 'express';
import StateGovernorate from '../models/states_governorates.model.js';

const router = express.Router();

// Create a new state/governorate
router.post('/states-governorates', async (req, res) => {
    try {
        await StateGovernorate.createStateGovernorate(req.body);
        res.status(201).send({ message: 'State/Governorate created successfully.' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Get all states/governorates
router.get('/states-governorates', async (req, res) => {
    try {
        const states = await StateGovernorate.getAllStatesGovernorates();
        res.status(200).send(states);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Get a state/governorate by ID
router.get('/states-governorates/:id', async (req, res) => {
    try {
        const state = await StateGovernorate.getStateGovernorateById(req.params.id);
        if (!state) {
            return res.status(404).send({ message: 'State/Governorate not found.' });
        }
        res.status(200).send(state);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Delete a state/governorate
router.delete('/states-governorates/:id', async (req, res) => {
    try {
        await StateGovernorate.deleteStateGovernorate(req.params.id);
        res.status(200).send({ message: 'State/Governorate deleted successfully.' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

export default router;