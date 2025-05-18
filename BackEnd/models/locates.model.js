import { connectToDatabase } from '../config/database.js';

class Locate {
    static async createLocate(userId, districtId, nationalId) {
        const connection = await connectToDatabase();
        const query = `INSERT INTO locates (user_id, district_id, national_id) VALUES (?, ?, ?)`;
        await connection.execute(query, [userId, districtId, nationalId]);
    }

    static async getAllLocates() {
        const connection = await connectToDatabase();
        const [rows] = await connection.execute(`SELECT * FROM locates`);
        return rows;
    }

    static async getLocateById(userId, districtId) {
        const connection = await connectToDatabase();
        const [rows] = await connection.execute(`SELECT * FROM locates WHERE user_id = ? AND district_id = ?`, [userId, districtId]);
        return rows[0];
    }

    static async deleteLocate(userId, districtId) {
        const connection = await connectToDatabase();
        await connection.execute(`DELETE FROM locates WHERE user_id = ? AND district_id = ?`, [userId, districtId]);
    }
}

export default Locate;