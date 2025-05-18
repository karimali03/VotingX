import { connectToDatabase } from '../config/database.js';

class City {
    static async createCity(name, stateGovernorateId) {
        const connection = await connectToDatabase();
        const query = `INSERT INTO Cities (name, states_governorates_id) VALUES (?, ?)`;
        await connection.execute(query, [name, stateGovernorateId]);
    }

    static async getAllCities() {
        const connection = await connectToDatabase();
        const [rows] = await connection.execute(`SELECT * FROM Cities`);
        return rows;
    }

    static async getCityById(id) {
        const connection = await connectToDatabase();
        const [rows] = await connection.execute(`SELECT * FROM Cities WHERE id = ?`, [id]);
        return rows[0];
    }

    static async updateCity(id, name, stateGovernorateId) {
        const connection = await connectToDatabase();
        const query = `UPDATE Cities SET name = ?, states_governorates_id = ? WHERE id = ?`;
        await connection.execute(query, [name, stateGovernorateId, id]);
    }

    static async deleteCity(id) {
        const connection = await connectToDatabase();
        await connection.execute(`DELETE FROM Cities WHERE id = ?`, [id]);
    }
}

export default City;