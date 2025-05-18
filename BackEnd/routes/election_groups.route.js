import express from 'express';
import ElectionGroup from '../models/election_groups.model.js';

const router = express.Router();

// Create a new election group
router.post('/election-groups', async (req, res) => {
    try {
        await ElectionGroup.createElectionGroup(req.body);
        res.status(201).send({ message: 'Election group created successfully.' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Get all election groups
router.get('/election-groups', async (req, res) => {
    try {
        const groups = await ElectionGroup.getAllElectionGroups();
        res.status(200).send(groups);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Get an election group by ID
router.get('/election-groups/:id', async (req, res) => {
    try {
        const group = await ElectionGroup.getElectionGroupById(req.params.id);
        if (!group) {
            return res.status(404).send({ message: 'Election group not found.' });
        }
        res.status(200).send(group);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Delete an election group
router.delete('/election-groups/:id', async (req, res) => {
    try {
        await ElectionGroup.deleteElectionGroup(req.params.id);
        res.status(200).send({ message: 'Election group deleted successfully.' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

export default router;