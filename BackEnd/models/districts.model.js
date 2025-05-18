import { connectToDatabase } from '../config/database.js';

class District {
    static async createDistrict(name, cityId) {
        const connection = await connectToDatabase();
        const query = `INSERT INTO Districts (name, city_id) VALUES (?, ?)`;
        await connection.execute(query, [name, cityId]);
    }

    static async getAllDistricts() {
        const connection = await connectToDatabase();
        const [rows] = await connection.execute(`SELECT * FROM Districts`);
        return rows;
    }

    static async getDistrictById(id) {
        const connection = await connectToDatabase();
        const [rows] = await connection.execute(`SELECT * FROM Districts WHERE id = ?`, [id]);
        return rows[0];
    }

    static async updateDistrict(id, name, cityId) {
        const connection = await connectToDatabase();
        const query = `UPDATE Districts SET name = ?, city_id = ? WHERE id = ?`;
        await connection.execute(query, [name, cityId, id]);
    }

    static async deleteDistrict(id) {
        const connection = await connectToDatabase();
        await connection.execute(`DELETE FROM Districts WHERE id = ?`, [id]);
    }
}

export default District;