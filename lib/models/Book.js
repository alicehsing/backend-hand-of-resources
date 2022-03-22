const pool = require('../utils/pool');

module.exports = class Book {
  id;
  title;
  author;
  publisher;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.author = row.author;
    this.publisher = row.publisher;
  }

  static async insert({ title, author, publisher }) {
    const { rows } = await pool.query(
      `INSERT INTO 
            books (title, author, publisher)
        VALUES 
            ($1, $2, $3)
        RETURNING 
            *`,
      [title, author, publisher]
    );

    return new Book(rows[0]);
  }

  // fetch all rows from database
  static async getAll() {
    const { rows } = await pool.query(
      `SELECT 
            * 
        FROM 
            books`
    );

    return rows.map((row) => new Book(row));
  }
};
