import User from '../models/user.model.js';
import asyncFun from '../middlewares/async.function.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class UserController {
        // Admin only - already protected by middleware
        static getAllUsers = asyncFun(async (req, res) => {
                const users = await User.getAllUsers();
                res.status(200).send({ message: "Users retrieved successfully", data: users });
        });

        static getUserById = asyncFun(async (req, res) => {
                const user = await User.getUserById(req.params.id, { password: 0 });
                if (!user) {
                        return res.status(404).send({ message: "User not found", data: null });
                }
                res.status(200).send({ message: "User found", data: user });
        });

        static createUser = asyncFun(async (req, res) => {
                const user = await User.createUser(req.body);
                res.status(201).send({
                        message: "User created successfully",
                        data: user
                });
        });

        static updateUserProfile = asyncFun(async (req, res) => {
                // Check if user is updating their own profile or is admin
                if (req.user.role !== 'admin' && req.user.id !== parseInt(req.params.id)) {
                        return res.status(403).send({
                                message: "Access denied - You can only update your own profile",
                                data: null
                        });
                }

                // Extract allowed fields from request body
                const allowedUpdates = {
                        first_name: req.body.first_name,
                        middle_name: req.body.middle_name,
                        last_name: req.body.last_name,
                        gender: req.body.gender,
                        birth_date: req.body.birth_date,
                        phone: req.body.phone,
                        current_address: req.body.current_address,
                        profile_image: req.body.profile_image
                };

                // Remove undefined fields
                Object.keys(allowedUpdates).forEach(key =>
                        allowedUpdates[key] === undefined && delete allowedUpdates[key]
                );

                // Check if there are any fields to update
                if (Object.keys(allowedUpdates).length === 0) {
                        return res.status(400).send({
                                message: 'No valid fields to update.',
                                data: null
                        });
                }

                // Get current user to verify it exists
                const existingUser = await User.getUserById(req.params.id);
                if (!existingUser) {
                        return res.status(404).send({
                                message: 'User not found.',
                                data: null
                        });
                }

                // Update user data
                const updatedUser = await User.updateUserById(req.params.id, allowedUpdates);
                res.status(200).send({
                        message: 'User profile updated successfully.',
                        data: updatedUser
                });
        });

        static uploadProfilePhoto = asyncFun(async (req, res) => {
                try {
                        // Check if user is uploading their own photo or is admin
                        if (req.user.role !== 'admin' && req.user.id !== parseInt(req.params.id)) {
                                // Delete uploaded file if unauthorized
                                if (req.file) {
                                        fs.unlinkSync(req.file.path);
                                }
                                return res.status(403).send({
                                        message: "Access denied - You can only upload your own profile photo",
                                        data: null
                                });
                        }

                        if (!req.file) {
                                return res.status(400).send({
                                        message: "No file uploaded",
                                        data: null
                                });
                        }

                        // Get current user to verify it exists and get current photo
                        const user = await User.getUserById(req.params.id);
                        if (!user) {
                                // Delete uploaded file if user not found
                                fs.unlinkSync(req.file.path);
                                return res.status(404).send({
                                        message: "User not found",
                                        data: null
                                });
                        }

                        // Delete old profile photo if it exists
                        if (user.profile_image) {
                                const oldPhotoPath = path.join(__dirname, '../public/uploads/profiles', path.basename(user.profile_image));
                                if (fs.existsSync(oldPhotoPath)) {
                                        fs.unlinkSync(oldPhotoPath);
                                }
                        }

                        // Update user profile with new photo filename
                        const photoUrl = `/uploads/profiles/${req.file.filename}`;
                        const updatedUser = await User.updateUserById(req.params.id, {
                                profile_image: photoUrl
                        });

                        res.status(200).send({
                                message: "Profile photo uploaded successfully",
                                data: {
                                        user: updatedUser,
                                        photo_url: photoUrl
                                }
                        });
                } catch (error) {
                        // Delete uploaded file if there's an error
                        if (req.file) {
                                fs.unlinkSync(req.file.path);
                        }
                        throw error;
                }
        });

        // Admin only - already protected by middleware
        static deleteUser = asyncFun(async (req, res) => {
                const user = await User.getUserById(req.params.id);
                if (!user) {
                        return res.status(404).send({
                                message: "User not found",
                                data: null
                        });
                }

                await User.deleteUser(req.params.id);
                res.status(200).send({
                        message: "User deleted successfully",
                        data: user
                });
        });
}

export default UserController;