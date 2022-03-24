const pool = require('../utils/pool');

module.exports = class Candy {
  id;
  name;
  type;
  texture;
  sugar_level;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.type = row.type;
    this.texture = row.texture;
    this.sugarLevel = row.sugar_level;
  }

  static async insert({ name, type, texture, sugarLevel }) {
    const { rows } = await pool.query(
      `INSERT INTO
          candies (name, type, texture, sugar_level)
        VALUES
          ($1, $2, $3, $4)
        RETURNING
          *`,
      [name, type, texture, sugarLevel]
    );
    return new Candy(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(
      `SELECT 
            *
          FROM
            candies`
    );

    return rows.map((row) => new Candy(row));
  }


  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT
          *
        FROM
          candies
        WHERE
          id=$1`,
      [id]
    );

    if (!rows[0]) return null;
    return new Candy(rows[0]);
  }


  static async updateById(id, attributes) {
    const existingCandy = await Candy.getById(id);
    const updatedAttributes = { ...existingCandy, ...attributes };
    const { name, type, texture, sugarLevel } = updatedAttributes;
    const { rows } = await pool.query(
      `UPDATE
            candies
          SET
            name=$1,
            type=$2,
            texture=$3,
            sugar_level=$4
          WHERE
            id=$5
          RETURNING
            *`,
      [name, type, texture, sugarLevel, id]
    );
    return new Candy(rows[0]);
  }


  static async deleteById(id) {
    const { rows } = await pool.query(
      `
          DELETE FROM
            candies
          WHERE
            id=$1
          RETURNING
            *`,
      [id]
    );
    return new Candy(rows[0]);
  }
};
