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

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT
          *
        FROM
          movies
        WHERE
          id=$1`,
      [id]
    );

    if (!rows[0]) return null;
    return new Movie(rows[0]);
  }

  static async updateById(id, attributes) {
    const existingMovie = await Movie.getById(id);
    const updatedAttributes = { ...existingMovie, ...attributes };
    const { title, director, yearReleased } = updatedAttributes;
    const { rows } = await pool.query(
      `UPDATE
          movies
        SET
          title=$1,
          director=$2,
          year_released=$3
        WHERE
            id=$4
        RETURNING
            *`,
      [title, director, yearReleased, id]
    );
    return new Movie(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      `
          DELETE FROM
            movies
          WHERE
            id=$1
          RETURNING
            *`,
      [id]
    );
    return new Movie(rows[0]);
  }

};
