import { connectToDatabase } from '../config/database.js';

class User {
  static async createUser(userData) {
    const connection = await connectToDatabase();
    const query = `INSERT INTO Users (first_name, middle_name, last_name, gender, birth_date, email, password, phone, current_address, account_verified, profile_image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [userData.first_name, userData.middle_name, userData.last_name, userData.gender, userData.birth_date, userData.email, userData.password, userData.phone, userData.current_address, userData.account_verified, userData.profile_image];
    await connection.execute(query, values);
  }

  static async getAllUsers() {
    const connection = await connectToDatabase();
    const [rows] = await connection.execute(`SELECT * FROM Users`);
    return rows;
  }

  static async getUserById(userId) {
    const connection = await connectToDatabase();
    const [rows] = await connection.execute(`SELECT * FROM Users WHERE id = ?`, [userId]);
    return rows[0];
  }

  static async getUserByemail(email) {
    const connection = await connectToDatabase();
    const [rows] = await connection.execute(`SELECT * FROM Users WHERE email = ?`, [email]);
    return rows[0];
  }

  static async updateUserById(id, updateData) {
    const connection = await connectToDatabase();
    const query = `UPDATE Users SET first_name = ?, middle_name = ?, last_name = ?, gender = ?, birth_date = ?, email = ?, password = ?, phone = ?, current_address = ?, account_verified = ?, profile_image = ? WHERE id = ?`;
    const values = [updateData.first_name, updateData.middle_name, updateData.last_name, updateData.gender, updateData.birth_date, updateData.email, updateData.password, updateData.phone, updateData.current_address, updateData.account_verified, updateData.profile_image, id];
    await connection.execute(query, values);
  }

  static async deleteUser(userId) {
    const connection = await connectToDatabase();
    await connection.execute(`DELETE FROM Users WHERE id = ?`, [userId]);
  }
}

export default User;