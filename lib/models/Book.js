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

  // fetch a single row
  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT
          *
        FROM
          books
        WHERE
          id=$1`,
      [id]
    );

    if (!rows[0]) return null;
    return new Book(rows[0]);
  }

  // update a row
  static async updateById(id, attributes) {
    const existingBook = await Book.getById(id);
    const updatedAttributes = { ...existingBook, ...attributes };
    const { title, author, publisher } = updatedAttributes;
    const { rows } = await pool.query(
      `UPDATE
            books
          SET
            title=$1,
            author=$2,
            publisher=$3
          WHERE
            id=$4
          RETURNING
            *`,
      [title, author, publisher, id]
    );
    return new Book(rows[0]);
  }

  // delete a row
  static async deleteById(id) {
    const { rows } = await pool.query(
      `
          DELETE FROM
            books
          WHERE
            id=$1
          RETURNING
            *`,
      [id]
    );
    return new Book(rows[0]);
  }

};
