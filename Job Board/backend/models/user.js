const db = require('../database/db');
const bcrypt = require('bcrypt');

class User {
  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await db.query(query, [email]);
    return result.rows[0];
  }

  static async create(userData) {
    const { name, email, password, role } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [name, email, hashedPassword, role];
    const result = await db.query(query, values);
    return result.rows[0];
  }
}

module.exports = User;