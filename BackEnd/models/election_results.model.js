import { connectToDatabase } from '../config/database.js';

class ElectionResult {
    static async createElectionResult(resultData) {
        const connection = await connectToDatabase();
        const query = `INSERT INTO ElectionResults (candidate_id, vote_count, percentage, is_winner) VALUES (?, ?, ?, ?)`;
        const values = [resultData.candidate_id, resultData.vote_count, resultData.percentage, resultData.is_winner];
        await connection.execute(query, values);
    }

    static async getAllElectionResults() {
        const connection = await connectToDatabase();
        const [rows] = await connection.execute(`SELECT * FROM ElectionResults`);
        return rows;
    }

    static async getElectionResultById(resultId) {
        const connection = await connectToDatabase();
        const [rows] = await connection.execute(`SELECT * FROM ElectionResults WHERE id = ?`, [resultId]);
        return rows[0];
    }

    static async deleteElectionResult(resultId) {
        const connection = await connectToDatabase();
        await connection.execute(`DELETE FROM ElectionResults WHERE id = ?`, [resultId]);
    }
}

export default ElectionResult;