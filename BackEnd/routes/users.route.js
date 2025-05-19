import express from 'express';
import UserController from '../controllers/user.controller.js';
import { verifyToken, isAdmin } from '../middlewares/auth.middleware.js';
import upload from '../middlewares/upload.middleware.js';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(verifyToken);

// Get all users - admin only
router.get('/', isAdmin, UserController.getAllUsers);

// Get a user by ID - authenticated user can only get their own profile
router.get('/:id', UserController.getUserById);

// Update user profile data - authenticated user can only update their own profile
router.patch('/:id/profile', UserController.updateUserProfile);

// Upload profile photo - authenticated user can only upload their own photo
router.post('/:id/profile/photo', upload.single('profile_photo'), UserController.uploadProfilePhoto);

// Delete a user - admin only
router.delete('/:id', isAdmin, UserController.deleteUser);

export default router;