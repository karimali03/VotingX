import express from 'express';
import authController from '../controllers/auth.controller.js';

const router = express.Router();

// Signup route
router.post('/signup', authController.signup);

// Signin route (optional, for login)
router.post('/signin', authController.signin);

// Email verification route
router.get('/verify-email', authController.verifyEmail);

// Forgot password
router.post('/forgot-password', authController.forgetPassword);

// Reset password
router.post('/reset-password', authController.resetPassword);

// Resend email verification route
router.post('/resend-verification-email', authController.resendVerificationEmail);

export default router;
