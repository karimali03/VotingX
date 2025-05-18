import express from 'express';
import User from '../models/user.model.js';

const router = express.Router();

// Create a new user
router.post('/', async (req, res) => {
    try {
        await User.createUser(req.body);
        res.status(201).send({ message: 'User created successfully.' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.getAllUsers();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Get a user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.getUserById(req.params.id);
        if (!user) {
            return res.status(404).send({ message: 'User not found.' });
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Delete a user
router.delete('/:id', async (req, res) => {
    try {
        await User.deleteUser(req.params.id);
        res.status(200).send({ message: 'User deleted successfully.' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

export default router;