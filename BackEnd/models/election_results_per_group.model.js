import { connectToDatabase } from '../config/database.js';

class ElectionResultPerGroup {
    static async createElectionResultPerGroup(resultData) {
        const connection = await connectToDatabase();
        const query = `INSERT INTO ElectionResultsPerGroup (group_id, candidate_id, vote_count, percentage, calculation_time) VALUES (?, ?, ?, ?, ?)`;
        const values = [resultData.group_id, resultData.candidate_id, resultData.vote_count, resultData.percentage, resultData.calculation_time];
        await connection.execute(query, values);
    }

    static async getAllElectionResultsPerGroup() {
        const connection = await connectToDatabase();
        const [rows] = await connection.execute(`SELECT * FROM ElectionResultsPerGroup`);
        return rows;
    }

    static async getElectionResultPerGroupById(resultId) {
        const connection = await connectToDatabase();
        const [rows] = await connection.execute(`SELECT * FROM ElectionResultsPerGroup WHERE id = ?`, [resultId]);
        return rows[0];
    }

    static async deleteElectionResultPerGroup(resultId) {
        const connection = await connectToDatabase();
        await connection.execute(`DELETE FROM ElectionResultsPerGroup WHERE id = ?`, [resultId]);
    }
}

export default ElectionResultPerGroup;