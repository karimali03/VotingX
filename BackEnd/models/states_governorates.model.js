import { connectToDatabase } from '../config/database.js';

class StateGovernorate {
    static async createStateGovernorate(name, countryCode) {
        const connection = await connectToDatabase();
        const query = `INSERT INTO States_Governorates (name, country_code) VALUES (?, ?)`;
        await connection.execute(query, [name, countryCode]);
    }

    static async getAllStatesGovernorates() {
        const connection = await connectToDatabase();
        const [rows] = await connection.execute(`SELECT * FROM States_Governorates`);
        return rows;
    }

    static async getStateGovernorateById(id) {
        const connection = await connectToDatabase();
        const [rows] = await connection.execute(`SELECT * FROM States_Governorates WHERE id = ?`, [id]);
        return rows[0];
    }

    static async updateStateGovernorate(id, name, countryCode) {
        const connection = await connectToDatabase();
        const query = `UPDATE States_Governorates SET name = ?, country_code = ? WHERE id = ?`;
        await connection.execute(query, [name, countryCode, id]);
    }

    static async deleteStateGovernorate(id) {
        const connection = await connectToDatabase();
        await connection.execute(`DELETE FROM States_Governorates WHERE id = ?`, [id]);
    }
}

export default StateGovernorate;