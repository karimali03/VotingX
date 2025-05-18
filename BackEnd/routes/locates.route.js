import express from 'express';
import Locate from '../models/locates.model.js';

const router = express.Router();

// Create a new locate
router.post('/locates', async (req, res) => {
    try {
        await Locate.createLocate(req.body);
        res.status(201).send({ message: 'Locate created successfully.' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Get all locates
router.get('/locates', async (req, res) => {
    try {
        const locates = await Locate.getAllLocates();
        res.status(200).send(locates);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Get a locate by ID
router.get('/locates/:id', async (req, res) => {
    try {
        const locate = await Locate.getLocateById(req.params.id);
        if (!locate) {
            return res.status(404).send({ message: 'Locate not found.' });
        }
        res.status(200).send(locate);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Delete a locate
router.delete('/locates/:id', async (req, res) => {
    try {
        await Locate.deleteLocate(req.params.id);
        res.status(200).send({ message: 'Locate deleted successfully.' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

export default router;