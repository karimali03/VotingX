import express from 'express';
import UserController from '../controllers/user.controller.js';

const router = express.Router();

// Create a new user
router.post('/', UserController.createUser);

// Get all users
router.get('/', UserController.getAllUsers);

// Get a user by ID
router.get('/:id', UserController.getUserById);

// Update user profile data
router.patch('/:id/profile', UserController.updateUserProfile);

// Delete a user
router.delete('/:id', UserController.deleteUser);

export default router;