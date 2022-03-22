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



}