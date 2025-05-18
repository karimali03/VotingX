import { connectToDatabase } from '../config/database.js';

class EncryptedCandidate {
    static async createEncryptedCandidate(candidateData) {
        const connection = await connectToDatabase();
        const query = `INSERT INTO encrypted_candidates (vote_id, encrypted_candidate, iv) VALUES (?, ?, ?)`;
        const values = [candidateData.vote_id, candidateData.encrypted_candidate, candidateData.iv];
        await connection.execute(query, values);
    }

    static async getAllEncryptedCandidates() {
        const connection = await connectToDatabase();
        const [rows] = await connection.execute(`SELECT * FROM encrypted_candidates`);
        return rows;
    }

    static async getEncryptedCandidateById(candidateId) {
        const connection = await connectToDatabase();
        const [rows] = await connection.execute(`SELECT * FROM encrypted_candidates WHERE id = ?`, [candidateId]);
        return rows[0];
    }

    static async deleteEncryptedCandidate(candidateId) {
        const connection = await connectToDatabase();
        await connection.execute(`DELETE FROM encrypted_candidates WHERE id = ?`, [candidateId]);
    }
}

export default EncryptedCandidate;