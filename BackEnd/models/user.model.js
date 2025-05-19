import { connectToDatabase } from '../config/database.js';

class User {
  static async createUser(userData) {
    const connection = await connectToDatabase();
    const query = `INSERT INTO Users (first_name, middle_name, last_name, role, gender, birth_date, email, password, phone, current_address, account_verified, profile_image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [userData.first_name, userData.middle_name, userData.last_name, userData.role || 'user', userData.gender, userData.birth_date, userData.email, userData.password, userData.phone, userData.current_address, userData.account_verified, userData.profile_image];
    const [result] = await connection.execute(query, values);

    // Fetch the newly created user by ID
    const [rows] = await connection.execute(`SELECT * FROM Users WHERE id = ?`, [result.insertId]);
    return rows[0];
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
    // Create an array to store all update promises
    const updatePromises = [];

    // Check each field and call the corresponding update function if it exists in updateData
    if (updateData.first_name !== undefined) {
      updatePromises.push(this.updateFirstName(id, updateData.first_name));
    }
    if (updateData.middle_name !== undefined) {
      updatePromises.push(this.updateMiddleName(id, updateData.middle_name));
    }
    if (updateData.last_name !== undefined) {
      updatePromises.push(this.updateLastName(id, updateData.last_name));
    }
    if (updateData.gender !== undefined) {
      updatePromises.push(this.updateGender(id, updateData.gender));
    }
    if (updateData.birth_date !== undefined) {
      updatePromises.push(this.updateBirthDate(id, updateData.birth_date));
    }
    if (updateData.email !== undefined) {
      updatePromises.push(this.updateEmail(id, updateData.email));
    }
    if (updateData.password !== undefined) {
      updatePromises.push(this.updatePassword(id, updateData.password));
    }
    if (updateData.phone !== undefined) {
      updatePromises.push(this.updatePhone(id, updateData.phone));
    }
    if (updateData.current_address !== undefined) {
      updatePromises.push(this.updateCurrentAddress(id, updateData.current_address));
    }
    if (updateData.profile_image !== undefined) {
      updatePromises.push(this.updateProfileImage(id, updateData.profile_image));
    }

    // Wait for all updates to complete
    await Promise.all(updatePromises);

    // Return the updated user
    const connection = await connectToDatabase();
    const [rows] = await connection.execute(`SELECT * FROM Users WHERE id = ?`, [id]);
    return rows[0];
  }

  static async deleteUser(userId) {
    const connection = await connectToDatabase();
    await connection.execute(`DELETE FROM Users WHERE id = ?`, [userId]);
  }

  static async verifyEmail(userId) {
    const connection = await connectToDatabase();
    const query = `UPDATE Users SET account_verified = true WHERE id = ?`;
    await connection.execute(query, [userId]);

    // Return the updated user object
    const [rows] = await connection.execute(`SELECT * FROM Users WHERE id = ?`, [userId]);
    return rows[0];
  }
  static async updatePassword(userId, newPassword) {
    const connection = await connectToDatabase();
    const query = `UPDATE Users SET password = ? WHERE id = ?`;
    await connection.execute(query, [newPassword, userId]);

    // Return the updated user object
    const [rows] = await connection.execute(`SELECT * FROM Users WHERE id = ?`, [userId]);
    return rows[0];
  }

  static async updateFirstName(userId, firstName) {
    const connection = await connectToDatabase();
    const query = `UPDATE Users SET first_name = ? WHERE id = ?`;
    await connection.execute(query, [firstName, userId]);
    const [rows] = await connection.execute(`SELECT * FROM Users WHERE id = ?`, [userId]);
    return rows[0];
  }

  static async updateMiddleName(userId, middleName) {
    const connection = await connectToDatabase();
    const query = `UPDATE Users SET middle_name = ? WHERE id = ?`;
    await connection.execute(query, [middleName, userId]);
    const [rows] = await connection.execute(`SELECT * FROM Users WHERE id = ?`, [userId]);
    return rows[0];
  }

  static async updateLastName(userId, lastName) {
    const connection = await connectToDatabase();
    const query = `UPDATE Users SET last_name = ? WHERE id = ?`;
    await connection.execute(query, [lastName, userId]);
    const [rows] = await connection.execute(`SELECT * FROM Users WHERE id = ?`, [userId]);
    return rows[0];
  }

  static async updateGender(userId, gender) {
    const connection = await connectToDatabase();
    const query = `UPDATE Users SET gender = ? WHERE id = ?`;
    await connection.execute(query, [gender, userId]);
    const [rows] = await connection.execute(`SELECT * FROM Users WHERE id = ?`, [userId]);
    return rows[0];
  }

  static async updateBirthDate(userId, birthDate) {
    const connection = await connectToDatabase();
    const query = `UPDATE Users SET birth_date = ? WHERE id = ?`;
    await connection.execute(query, [birthDate, userId]);
    const [rows] = await connection.execute(`SELECT * FROM Users WHERE id = ?`, [userId]);
    return rows[0];
  }

  static async updateEmail(userId, email) {
    const connection = await connectToDatabase();
    const query = `UPDATE Users SET email = ? WHERE id = ?`;
    await connection.execute(query, [email, userId]);
    const [rows] = await connection.execute(`SELECT * FROM Users WHERE id = ?`, [userId]);
    return rows[0];
  }

  static async updatePhone(userId, phone) {
    const connection = await connectToDatabase();
    const query = `UPDATE Users SET phone = ? WHERE id = ?`;
    await connection.execute(query, [phone, userId]);
    const [rows] = await connection.execute(`SELECT * FROM Users WHERE id = ?`, [userId]);
    return rows[0];
  }

  static async updateCurrentAddress(userId, currentAddress) {
    const connection = await connectToDatabase();
    const query = `UPDATE Users SET current_address = ? WHERE id = ?`;
    await connection.execute(query, [currentAddress, userId]);
    const [rows] = await connection.execute(`SELECT * FROM Users WHERE id = ?`, [userId]);
    return rows[0];
  }

  static async updateProfileImage(userId, profileImage) {
    const connection = await connectToDatabase();
    const query = `UPDATE Users SET profile_image = ? WHERE id = ?`;
    await connection.execute(query, [profileImage, userId]);
    const [rows] = await connection.execute(`SELECT * FROM Users WHERE id = ?`, [userId]);
    return rows[0];
  }

}

export default User;