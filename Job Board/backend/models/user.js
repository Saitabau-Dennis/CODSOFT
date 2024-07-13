const db = require('../database/config');
const bcrypt = require('bcryptjs');

class User {
  static async create(name, email, password, userType) {
    const hashedPassword = await bcrypt.hash(password, 12);
    const query = 'INSERT INTO Users(name, email, password, user_type) VALUES($1, $2, $3, $4) RETURNING *';
    const values = [name, email, hashedPassword, userType];
    const result = await db.query(query, values);
    return result.rows[0];
  }

  static async findByEmail(email) {
    const query = 'SELECT * FROM Users WHERE email = $1';
    const result = await db.query(query, [email]);
    return result.rows[0];
  }

  static async comparePassword(providedPassword, storedPassword) {
    return await bcrypt.compare(providedPassword, storedPassword);
  }
}

module.exports = User;
