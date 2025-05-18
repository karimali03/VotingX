import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const devConnection = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, // add port from .env
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

const prodConnection = {
    host: process.env.DB_HOST_PROD,
    user: process.env.DB_USER_PROD,
    password: process.env.DB_PASSWORD_PROD,
    database: process.env.DB_NAME_PROD
};

const connectionConfig = process.env.NODE_ENV === 'production' ? prodConnection : devConnection;

export async function connectToDatabase() {
    try {
        const connection = await mysql.createConnection(connectionConfig);
        console.log('Database connected');
        return connection;
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
}
