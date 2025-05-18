import { connectToDatabase } from '../config/database.js';

class Country {
    static async createCountry(code, name) {
        const connection = await connectToDatabase();
        const query = `INSERT INTO Countries (code, name) VALUES (?, ?)`;
        await connection.execute(query, [code, name]);
    }

    static async getAllCountries() {
        const connection = await connectToDatabase();
        const [rows] = await connection.execute(`SELECT * FROM Countries`);
        return rows;
    }

    static async getCountryByCode(code) {
        const connection = await connectToDatabase();
        const [rows] = await connection.execute(`SELECT * FROM Countries WHERE code = ?`, [code]);
        return rows[0];
    }

    static async updateCountry(code, name) {
        const connection = await connectToDatabase();
        const query = `UPDATE Countries SET name = ? WHERE code = ?`;
        await connection.execute(query, [name, code]);
    }

    static async deleteCountry(code) {
        const connection = await connectToDatabase();
        await connection.execute(`DELETE FROM Countries WHERE code = ?`, [code]);
    }
}

export default Country;