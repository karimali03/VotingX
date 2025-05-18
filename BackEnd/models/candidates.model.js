import { connectToDatabase } from '../config/database.js';

class Candidate {
    static async createCandidate(candidateData) {
        const connection = await connectToDatabase();
        const query = `INSERT INTO Candidates (user_id, election_id, party, bio, campaign_platform, photo_url, is_referendum_option, option_label) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [candidateData.user_id, candidateData.election_id, candidateData.party, candidateData.bio, candidateData.campaign_platform, candidateData.photo_url, candidateData.is_referendum_option, candidateData.option_label];
        await connection.execute(query, values);
    }

    static async getAllCandidates() {
        const connection = await connectToDatabase();
        const [rows] = await connection.execute(`SELECT * FROM Candidates`);
        return rows;
    }

    static async getCandidateById(candidateId) {
        const connection = await connectToDatabase();
        const [rows] = await connection.execute(`SELECT * FROM Candidates WHERE id = ?`, [candidateId]);
        return rows[0];
    }

    static async deleteCandidate(candidateId) {
        const connection = await connectToDatabase();
        await connection.execute(`DELETE FROM Candidates WHERE id = ?`, [candidateId]);
    }
}

export default Candidate;