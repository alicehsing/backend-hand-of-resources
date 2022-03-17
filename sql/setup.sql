-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS dogs;

CREATE TABLE dogs (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    age INT NOT NULL CHECK (age > -1),
    favorite_treat TEXT
);

INSERT INTO
    dogs (name, age, favorite_treat)

VALUES
    ('Gus', 3, 'Chicken Strips'),
    ('Cooper', 10, 'Salmon');