import User from '../models/user.model.js';
import asyncFun from '../middlewares/async.function.js';

class UserController {
        static getAllUsers = asyncFun(async (req, res) => {
                const users = await User.getAllUsers();
                res.status(200).send({ message: "OK", data: users });
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