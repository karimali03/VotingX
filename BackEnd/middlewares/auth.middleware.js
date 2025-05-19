import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { connectToDatabase } from '../config/database.js';

// Middleware to verify JWT token
export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).send({
                message: "No token provided",
                data: null
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const connection = await connectToDatabase();
        const [users] = await connection.execute(
            'SELECT id, role FROM Users WHERE id = ?',
            [decoded.userId]
        );

        if (users.length === 0) {
            return res.status(401).send({
                message: "Invalid token - user not found",
                data: null
            });
        }

        req.user = {
            id: users[0].id,
            role: users[0].role
        };
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        return res.status(401).send({
            message: "Invalid token",
            data: null
        });
    }
};

// Middleware to check if user is admin
export const isAdmin = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).send({
                message: "Authentication required",
                data: null
            });
        }

        if (req.user.role !== 'admin') {
            return res.status(403).send({
                message: "Access denied - Admin rights required",
                data: null
            });
        }

        next();
    } catch (error) {
        return res.status(500).send({
            message: "Error checking admin rights",
            data: null
        });
    }
}; 