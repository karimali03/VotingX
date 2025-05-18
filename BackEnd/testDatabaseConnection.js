import dotenv from 'dotenv';
dotenv.config();
import mysql from 'mysql2/promise';

(async () => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT, // use port from .env
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
        console.log('Database connected successfully');

        const [results] = await connection.query('SELECT NOW() AS currentTime');
        console.log('Database is working. Current time:', results[0].currentTime);

        await connection.end();
    } catch (error) {
        console.error('Database connection failed:', error);
    }
})();