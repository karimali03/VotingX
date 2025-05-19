import jwt from 'jsonwebtoken';
import mailService from '../utils/mail.service.js';
import bcrypt from '../utils/bcrypt.js';
import asyncFun from '../middlewares/async.function.js';
import User from '../models/user.model.js';

// Helper function to sign JWT tokens
const signToken = (userId, role) => {
    return jwt.sign({ userId, role }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

class authController {
    // Signup handler
    static signup = asyncFun(async (req, res) => {
        const {
            first_name, last_name, gender, birth_date,
            email, password, phone,
            current_address, profile_image, middle_name
        } = req.body;

        if (!first_name || !last_name || !gender || !birth_date || !email || !password) {
            return res.status(400).send({ message: "Missing required fields" });
        }

        const isExist = await User.getUserByemail(email);
        if (isExist) return res.status(400).send({ message: "Email already exists" });

        const hashedPassword = await bcrypt.hashPassword(password);

        const userData = {
            first_name,
            middle_name: middle_name || null,
            last_name,
            gender,
            birth_date,
            email,
            password: hashedPassword,
            phone: phone || null,
            current_address: current_address || null,
            account_verified: false,
            profile_image: profile_image || null
        };

        const newUser = await User.createUser(userData);

        const mailer = new mailService();
        const verificationToken = signToken(newUser.id, newUser.role);
        const verificationLink = `${process.env.URL}/api/v1/auth/verify-email?token=${verificationToken}`;

        await mailer.sendVerificationEmail(email, verificationLink);

        res.status(201).send({
            message: "Check your email to verify your account",
            data: newUser
        });
    });

    // Email verification handler
    static verifyEmail = asyncFun(async (req, res) => {
        try {
            const { token } = req.query;
            if (!token) return res.status(400).send({ message: 'Token is required' });

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.getUserById(decoded.userId);
            if (!user) return res.status(404).send({ message: 'User not found' });

            if (user.account_verified) {
                return res.status(400).send({ message: 'Email is already verified' });
            }

            await User.verifyEmail(user.id);
            res.send({ message: 'Email verified successfully!' });
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(400).send({ message: 'Token has expired. Please request a new verification email.' });
            } else if (error.name === 'JsonWebTokenError') {
                return res.status(400).send({ message: 'Invalid token. Please request a new verification email.' });
            }
            res.status(500).send({ message: 'An error occurred during email verification' });
        }
    });

    // Sign-in handler
    static signin = asyncFun(async (req, res) => {
        const { email, password } = req.body;

        const user = await User.getUserByemail(email);
        if (!user) return res.status(400).send({ message: 'User not found' });

        const isMatch = await bcrypt.comparePassword(password, user.password);
        if (!isMatch) return res.status(400).send({ message: 'Invalid credentials' });

        const token = signToken(user.id, user.role);
        res.header('x-auth-token', token).send({ message: 'Sign in successful' });
    });

    // Forgot password handler
    static forgetPassword = asyncFun(async (req, res) => {
        const { email } = req.body;

        const user = await User.getUserByemail(email);
        if (!user) return res.status(400).send({ message: 'User not found' });

        const resetToken = signToken(user.id, user.role);
        const resetLink = `${process.env.URL}/api/v1/auth/reset-password?token=${resetToken}`;

        const mailer = new mailService();
        await mailer.sendPasswordResetEmail(email, resetLink);

        res.send({ message: 'Password reset email sent successfully' });
    });

    // Reset password handler
    static resetPassword = asyncFun(async (req, res) => {
        try {
            const { token } = req.query;
            const { password } = req.body;

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const userId = decoded.userId;

            const hashedPassword = await bcrypt.hashPassword(password);
            await User.updateUserById(userId, { password: hashedPassword });

            res.send({ message: 'Password reset successfully' });
        } catch (error) {
            res.status(400).send({ message: 'Invalid or expired token' });
        }
    });

    // Change password handler
    static changePassword = asyncFun(async (req, res) => {
        const { oldPassword, newPassword } = req.body;

        const user = await User.getUserById(req.user.id);
        const isMatch = await user.comparePassword(oldPassword);
        if (!isMatch) return res.status(400).send({ message: 'Invalid credentials' });

        const hashedPassword = await bcrypt.hashPassword(newPassword);
        await User.updateUserById(req.user.id, { password: hashedPassword });

        res.send({ message: 'Password changed successfully' });
    });

    // Resend verification email handler
    static resendVerificationEmail = asyncFun(async (req, res) => {
        const { email } = req.body;
        if (!email) return res.status(400).send({ message: "Email is required" });

        const user = await User.getUserByemail(email);
        if (!user) return res.status(404).send({ message: "User not found" });

        if (user.account_verified) {
            return res.status(400).send({ message: "Account is already verified" });
        }

        const verificationToken = signToken(user.id, user.role);
        const verificationLink = `${process.env.URL}/api/v1/auth/verify-email?token=${verificationToken}`;

        const mailer = new mailService();
        await mailer.sendVerificationEmail(email, verificationLink);

        res.send({ message: "Verification email sent successfully" });
    });

    // Restriction middleware
    static restrictTo = (...roles) => {
        return asyncFun(async (req, res, next) => {
            if (!roles.includes(req.user.role) &&
                !(roles.includes("User") && req.user.id === req.params.id)) {
                return res.status(403).send({
                    message: "You do not have permission to perform this action"
                });
            }
            next();
        });
    };

    // Check if user's email is verified
    static verifyUser = asyncFun(async (req, res, next) => {
        if (!req.user.account_verified) {
            return res.status(403).send({ message: "Please verify your email first" });
        }
        next();
    });

    // Middleware to validate JWT token and extract user
    static validateAuth = asyncFun(async (req, res, next) => {
        const token = req.headers['x-auth-token'];
        if (!token) return res.status(401).send({ message: "No token provided" });

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const userData = await User.getUserById(decoded.userId);
            if (!userData) return res.status(401).send({ message: "User not found" });

            req.user = userData;
            next();
        } catch (error) {
            return res.status(400).send({ message: "Invalid token" });
        }
    });
}

export default authController;
