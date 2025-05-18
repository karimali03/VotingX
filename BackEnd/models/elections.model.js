import { connectToDatabase } from '../config/database.js';

class Election {
    static async createElection(electionData) {
        const connection = await connectToDatabase();
        const query = `INSERT INTO Elections (election_name, start_date, end_date, description, status, created_at, created_by, vote_count_method, type_name, max_choices) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [electionData.election_name, electionData.start_date, electionData.end_date, electionData.description, electionData.status, electionData.created_at, electionData.created_by, electionData.vote_count_method, electionData.type_name, electionData.max_choices];
        await connection.execute(query, values);
    }

    static async getAllElections() {
        const connection = await connectToDatabase();
        const [rows] = await connection.execute(`SELECT * FROM Elections`);
        return rows;
    }

    static async getElectionById(electionId) {
        const connection = await connectToDatabase();
        const [rows] = await connection.execute(`SELECT * FROM Elections WHERE id = ?`, [electionId]);
        return rows[0];
    }

    static async deleteElection(electionId) {
        const connection = await connectToDatabase();
        await connection.execute(`DELETE FROM Elections WHERE id = ?`, [electionId]);
    }
}

export default Election;