import express from 'express';
import EncryptedCandidate from '../models/encrypted_candidates.model.js';

const router = express.Router();

// Create a new encrypted candidate
router.post('/encrypted-candidates', async (req, res) => {
    try {
        await EncryptedCandidate.createEncryptedCandidate(req.body);
        res.status(201).send({ message: 'Encrypted candidate created successfully.' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Get all encrypted candidates
router.get('/encrypted-candidates', async (req, res) => {
    try {
        const candidates = await EncryptedCandidate.getAllEncryptedCandidates();
        res.status(200).send(candidates);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Get an encrypted candidate by ID
router.get('/encrypted-candidates/:id', async (req, res) => {
    try {
        const candidate = await EncryptedCandidate.getEncryptedCandidateById(req.params.id);
        if (!candidate) {
            return res.status(404).send({ message: 'Encrypted candidate not found.' });
        }
        res.status(200).send(candidate);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Delete an encrypted candidate
router.delete('/encrypted-candidates/:id', async (req, res) => {
    try {
        await EncryptedCandidate.deleteEncryptedCandidate(req.params.id);
        res.status(200).send({ message: 'Encrypted candidate deleted successfully.' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

export default router;