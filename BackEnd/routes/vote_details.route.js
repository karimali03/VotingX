import express from 'express';
import VoteDetail from '../models/vote_details.model.js';

const router = express.Router();

// Create a new vote detail
router.post('/vote-details', async (req, res) => {
    try {
        await VoteDetail.createVoteDetail(req.body);
        res.status(201).send({ message: 'Vote detail created successfully.' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Get all vote details
router.get('/vote-details', async (req, res) => {
    try {
        const details = await VoteDetail.getAllVoteDetails();
        res.status(200).send(details);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Get a vote detail by ID
router.get('/vote-details/:id', async (req, res) => {
    try {
        const detail = await VoteDetail.getVoteDetailById(req.params.id);
        if (!detail) {
            return res.status(404).send({ message: 'Vote detail not found.' });
        }
        res.status(200).send(detail);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Delete a vote detail
router.delete('/vote-details/:id', async (req, res) => {
    try {
        await VoteDetail.deleteVoteDetail(req.params.id);
        res.status(200).send({ message: 'Vote detail deleted successfully.' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

export default router;