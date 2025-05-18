import express from 'express';
import Election from '../models/elections.model.js';

const router = express.Router();

// Create a new election
router.post('/elections', async (req, res) => {
    try {
        await Election.createElection(req.body);
        res.status(201).send({ message: 'Election created successfully.' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Get all elections
router.get('/elections', async (req, res) => {
    try {
        const elections = await Election.getAllElections();
        res.status(200).send(elections);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Get an election by ID
router.get('/elections/:id', async (req, res) => {
    try {
        const election = await Election.getElectionById(req.params.id);
        if (!election) {
            return res.status(404).send({ message: 'Election not found.' });
        }
        res.status(200).send(election);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Delete an election
router.delete('/elections/:id', async (req, res) => {
    try {
        await Election.deleteElection(req.params.id);
        res.status(200).send({ message: 'Election deleted successfully.' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

export default router;