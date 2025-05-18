import { connectToDatabase } from '../config/database.js';

class ElectionGroup {
    static async createElectionGroup(groupData) {
        const connection = await connectToDatabase();
        const query = `INSERT INTO ElectionGroups (election_id, group_name, score, description) VALUES (?, ?, ?, ?)`;
        const values = [groupData.election_id, groupData.group_name, groupData.score, groupData.description];
        await connection.execute(query, values);
    }

    static async getAllElectionGroups() {
        const connection = await connectToDatabase();
        const [rows] = await connection.execute(`SELECT * FROM ElectionGroups`);
        return rows;
    }

    static async getElectionGroupById(groupId) {
        const connection = await connectToDatabase();
        const [rows] = await connection.execute(`SELECT * FROM ElectionGroups WHERE id = ?`, [groupId]);
        return rows[0];
    }

    static async deleteElectionGroup(groupId) {
        const connection = await connectToDatabase();
        await connection.execute(`DELETE FROM ElectionGroups WHERE id = ?`, [groupId]);
    }
}

export default ElectionGroup;