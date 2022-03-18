const pool = require('../utils/pool');

module.exports = class Dog {
    id;
    name;
    age;
    favorite_treat;

    constructor(row) {
        this.id = row.id;
        this.name = row.name;
        this.age = row.age;
        this.favoriteTreat = row.favorite_treat;
    }

    // insert a row in DB
    static async insert({ name, age, favoriteTreat }) {
        const { rows } = await pool.query(
            `INSERT INTO 
                dogs (name, age, favorite_treat) 
            VALUES 
                ($1, $2, $3)
            RETURNING 
                *`, 
            [name, age, favoriteTreat]
        );
        return new Dog(rows[0]);
    }

    // fetch all rows
    static async getAll() {
        const { rows } = await pool.query(
            `SELECT 
                * 
            FROM 
                dogs`
        );
        // convert all the rows into new Dog instances
        return rows.map((row) => new Dog(row))
    }

    // fetch a single row
    static async getById(id) {
        const { rows } = await pool.query(
            `SELECT 
                * 
            FROM 
                dogs 
            WHERE 
                id=$1`,
            [id]
        );

        if (!rows[0]) return null;
        return new Dog(rows[0]);
    }

    // delete a row
    static async deleteById(id) {
        const { rows } = await pool.query(
            `DELETE FROM 
                dogs 
            WHERE 
                id=$1 
            RETURNING 
                *`, [id]
        );
        
        return new Dog(rows[0]);
    }

    // update a row
    static async updateById(id, attributes) {
        const existingDog = await Dog.getById(id);
        const updatedAttributes = { ...existingDog, ...attributes };
        const { name, age, favoriteTreat } = updatedAttributes;
        const { rows } = await pool.query(
            `UPDATE 
                dogs 
            SET 
                name=$1,
                age=$2,
                favorite_treat=$3
            WHERE
                id=$4
            RETURNING
                *
            `,
            [name, age, favoriteTreat, id]
        );
        return new Dog(rows[0]);
    }
}

