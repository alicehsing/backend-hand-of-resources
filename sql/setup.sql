-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS dogs;
DROP TABLE IF EXISTS songs;
DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS movies;

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


CREATE TABLE songs (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    artist TEXT NOT NULL,
    album TEXT NOT NULL
);

INSERT INTO
    songs (title, artist, album)
VALUES
    ('At the Beginning', 'Evynne Hollens and Peter Hollens', 'Single'),
    ('Believer', 'Imagine Dragons', 'Evolve');

CREATE TABLE books (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    publisher TEXT NOT NULL
);

INSERT INTO
    books (title, author, publisher)
VALUES
    ('Full', 'Julia Styro', 'Lake Union Publishing'),
    ('The Judge''s List', 'John Grisham', ' Doubleday');


CREATE TABLE movies (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    director TEXT NOT NULL,
    year_published INT NOT NULL
);

INSERT INTO
    movies (title, director, year_published)
VALUES
    ('The Godfather', 'Francis Ford Coppola', 1972),
    ('The Skeleton Key', 'Iain Softley', 2005);
