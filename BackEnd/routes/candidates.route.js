import express from 'express';
import Candidate from '../models/candidates.model.js';

const router = express.Router();

// Create a new candidate
router.post('/candidates', async (req, res) => {
    try {
        await Candidate.createCandidate(req.body);
        res.status(201).send({ message: 'Candidate created successfully.' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Get all candidates
router.get('/candidates', async (req, res) => {
    try {
        const candidates = await Candidate.getAllCandidates();
        res.status(200).send(candidates);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Get a candidate by ID
router.get('/candidates/:id', async (req, res) => {
    try {
        const candidate = await Candidate.getCandidateById(req.params.id);
        if (!candidate) {
            return res.status(404).send({ message: 'Candidate not found.' });
        }
        res.status(200).send(candidate);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Delete a candidate
router.delete('/candidates/:id', async (req, res) => {
    try {
        await Candidate.deleteCandidate(req.params.id);
        res.status(200).send({ message: 'Candidate deleted successfully.' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

export default router;