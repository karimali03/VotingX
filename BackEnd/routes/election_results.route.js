import express from 'express';
import ElectionResult from '../models/election_results.model.js';

const router = express.Router();

// Create a new election result
router.post('/election-results', async (req, res) => {
    try {
        await ElectionResult.createElectionResult(req.body);
        res.status(201).send({ message: 'Election result created successfully.' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Get all election results
router.get('/election-results', async (req, res) => {
    try {
        const results = await ElectionResult.getAllElectionResults();
        res.status(200).send(results);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Get an election result by ID
router.get('/election-results/:id', async (req, res) => {
    try {
        const result = await ElectionResult.getElectionResultById(req.params.id);
        if (!result) {
            return res.status(404).send({ message: 'Election result not found.' });
        }
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Delete an election result
router.delete('/election-results/:id', async (req, res) => {
    try {
        await ElectionResult.deleteElectionResult(req.params.id);
        res.status(200).send({ message: 'Election result deleted successfully.' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

export default router;