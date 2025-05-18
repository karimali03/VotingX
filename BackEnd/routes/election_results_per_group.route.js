import express from 'express';
import ElectionResultPerGroup from '../models/election_results_per_group.model.js';

const router = express.Router();

// Create a new election result per group
router.post('/election-results-per-group', async (req, res) => {
    try {
        await ElectionResultPerGroup.createElectionResultPerGroup(req.body);
        res.status(201).send({ message: 'Election result per group created successfully.' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Get all election results per group
router.get('/election-results-per-group', async (req, res) => {
    try {
        const results = await ElectionResultPerGroup.getAllElectionResultsPerGroup();
        res.status(200).send(results);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Get an election result per group by ID
router.get('/election-results-per-group/:id', async (req, res) => {
    try {
        const result = await ElectionResultPerGroup.getElectionResultPerGroupById(req.params.id);
        if (!result) {
            return res.status(404).send({ message: 'Election result per group not found.' });
        }
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Delete an election result per group
router.delete('/election-results-per-group/:id', async (req, res) => {
    try {
        await ElectionResultPerGroup.deleteElectionResultPerGroup(req.params.id);
        res.status(200).send({ message: 'Election result per group deleted successfully.' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

export default router;