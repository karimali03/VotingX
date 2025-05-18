import { connectToDatabase } from '../config/database.js';

class GroupDistrict {
    static async createGroupDistrict(groupId, districtId, electionId) {
        const connection = await connectToDatabase();
        const query = `INSERT INTO GroupDistricts (group_id, district_id, election_id) VALUES (?, ?, ?)`;
        await connection.execute(query, [groupId, districtId, electionId]);
    }

    static async getAllGroupDistricts() {
        const connection = await connectToDatabase();
        const [rows] = await connection.execute(`SELECT * FROM GroupDistricts`);
        return rows;
    }

    static async deleteGroupDistrict(groupId, districtId) {
        const connection = await connectToDatabase();
        await connection.execute(`DELETE FROM GroupDistricts WHERE group_id = ? AND district_id = ?`, [groupId, districtId]);
    }
}

export default GroupDistrict;