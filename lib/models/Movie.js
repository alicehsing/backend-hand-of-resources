const pool = require('../utils/pool');

module.exports = class Movie {
  id;
  title;
  director;
  year_released;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.director = row.director;
    this.yearReleased = row.year_released;
  }

  static async insert({ title, director, yearReleased }) {
    const { rows } = await pool.query(
      `INSERT INTO
          movies (title, director, year_released)
        VALUES
          ($1, $2, $3)
        RETURNING
          *`,
      [title, director, yearReleased]
    );
    return new Movie(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(
      `SELECT
          *
        FROM
          movies`
    );
    return rows.map((row) => new Movie(row));
  }




};
