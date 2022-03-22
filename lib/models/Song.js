const pool = require('../utils/pool');

module.exports = class Song {
  id;
  title;
  artist;
  album;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.artist = row.artist;
    this.album = row.album;
  }

  // insert a row in DB
  static async insert({ title, artist, album }) {
    const { rows } = await pool.query(
      `INSERT INTO 
            songs (title, artist, album)
        VALUES 
            ($1, $2, $3) 
        RETURNING 
            *`, 
      [title, artist, album]
    );
    
   
    return new Song(rows[0]);
  }

  // fetch all rows from DB
  static async getAll() {
    const { rows } = await pool.query(
      `SELECT 
        * 
      FROM 
        songs`
    );
  
    return rows.map((row) => new Song(row));
  }

  // fetch one row
  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT 
        * 
      FROM 
        songs 
      WHERE 
        id=$1`, 
      [id]
    );
    
    if (!rows[0]) return null;
    return new Song(rows[0]);
  }

  // update one row
  static async updateById(id, attributes) {
    const existingSong = await Song.getById(id);
    const updatedAttributes = { ...existingSong, ...attributes };
    const { title, artist, album } = updatedAttributes;
    const { rows } = await pool.query(
      `UPDATE 
            songs 
        SET 
            title=$1, 
            artist=$2, 
            album=$3 
        WHERE 
            id=$4
        RETURNING  
        *`,
      [title, artist, album, id]
    );

    return new Song(rows[0]);
  }

  // delete one row 
  static async deleteById(id) {
    const { rows } = await pool.query(
      `DELETE FROM 
        songs
      WHERE
        id=$1
      RETURNING
        *`, [id]
    );

    return new Song (rows[0]);
  }

};
