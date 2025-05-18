import { connectToDatabase } from '../config/database.js';

class VoteDetail {
    static async createVoteDetail(voteData) {
        const connection = await connectToDatabase();
        const query = `INSERT INTO VoteDetails (hashed_user_id, group_id, timestamp) VALUES (?, ?, ?)`;
        const values = [voteData.hashed_user_id, voteData.group_id, voteData.timestamp];
        await connection.execute(query, values);
    }

    static async getAllVoteDetails() {
        const connection = await connectToDatabase();
        const [rows] = await connection.execute(`SELECT * FROM VoteDetails`);
        return rows;
    }

    static async getVoteDetailById(voteId) {
        const connection = await connectToDatabase();
        const [rows] = await connection.execute(`SELECT * FROM VoteDetails WHERE id = ?`, [voteId]);
        return rows[0];
    }

    static async deleteVoteDetail(voteId) {
        const connection = await connectToDatabase();
        await connection.execute(`DELETE FROM VoteDetails WHERE id = ?`, [voteId]);
    }
}

export default VoteDetail;