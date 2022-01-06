-- Create a table

CREATE TABLE cities (
  name VARCHAR(50),
  country VARCHAR(50),
  population INTEGER,
  area INTEGER
);

-- Insert record(s) into a table

INSERT INTO cities (name, country, population, area)
VALUES ('Tokyo', 'Japan', 38505000, 8223);

INSERT INTO cities (name, country, population, area)
VALUES
  ('Delhi', 'India', 28125000, 2240),
  ('Shanghai', 'China', 22125000, 4015),
  ('Sao Paulo', 'Brazil', 20935000, 3043);

-- Read data

SELECT * FROM cities;

SELECT name, country FROM cities;

SELECT area, name, population FROM cities;

SELECT name, name, name FROM cities;

/*
Math operators:
  +     Add
  -     Subtract
  *     Multiply
  /     Divide
  ^     Exponent
  |/    Square root
  @     Absolute value
  %     Remainder
*/

SELECT name, population / area FROM cities;

-- Rename a column of the results
SELECT name, population / area AS population_density FROM cities;

SELECT name, price * units_sold AS revenue FROM phones;

/*
String operators and functions:
  ||          Join two strings
  CONCAT()    Join two strings
  LOWER()     Gives a lowercase string
  LENGTH()    Gives number of chars in a string
  UPPER()     Gives an uppercase string
*/

SELECT name || ', ' || country AS location FROM cities;

SELECT CONCAT(name, ', ', country) AS location FROM cities;

SELECT
  UPPER(CONCAT(name, ', ', country)) AS location
FROM
  cities;
