/*
When thinking about the statements that you write, don't assume that
PostgreSQL runs your statements from first letter to last. For instance,
in the first statement below, PostgreSQL first evaluates the "FROM cities"
to decide which table to work with, then it runs "WHERE ..." part to
filter the table, then lastly it applies the "SELECT ..." part to only
return columns that are asked for.
*/

/*
Comparison Math Operators
  = Are the values equal
  <> Are the values not equal
  != Are the values not equal
  > Is the value on the left greater
  < Is the value on the left less
  >= Is the value on the left greator or equal to
  <= Is the value on the left less or equal to
  BETWEEN Is the value between two other values
  IN Is the value present in a list
  NOT IN Is the value not present in a list
*/

-- Filtering rows with WHERE

SELECT name, area FROM cities WHERE area > 4000;

SELECT name, area FROM cities WHERE area = 8223;

SELECT name, area FROM cities WHERE area != 8223;

SELECT name, area FROM cities WHERE area <> 8223;

SELECT name, area FROM cities WHERE area BETWEEN 2000 AND 4000;

SELECT
  name, area
FROM
  cities
WHERE
  name IN ('Delhi', 'Shanghai');

SELECT
  name,
  area
FROM
  cities
WHERE
  name NOT IN ('Delhi', 'Shanghai');

SELECT
  name,
  area
FROM
  cities
WHERE
  area NOT IN (3043, 8223);

-- Componund WHERE clauses

SELECT
  name,
  area
FROM
  cities
WHERE
  area NOT IN (3043, 8223)
  AND name = 'Delhi';

SELECT
  name,
  area
FROM
  cities
WHERE
  area NOT IN (3043, 8223)
  OR name = 'Delhi';

SELECT
  name,
  area
FROM
  cities
WHERE
  area NOT IN (3043, 8223)
  OR name = 'Delhi'
  OR name = 'Tokyo';

SELECT name, price FROM phones WHERE units_sold > 5000;

SELECT
  name,
  manufacturer
FROM
  phones
WHERE
  manufacturer IN ('Apple', 'Samsung');

SELECT
  name,
  manufacturer
FROM
  phones
WHERE
  manufacturer = 'Apple'
  OR manufacturer = 'Samsung';

-- Calculation in WHERE clauses

SELECT
	name,
  population / area AS population_density
FROM
	cities
WHERE
	population / area > 6000;

SELECT
  name,
  price * units_sold AS total_revenue
FROM
  phones
WHERE
  price * units_sold > 1000000;

-- Updating records

UPDATE cities
SET population = 39505000
WHERE name = 'Tokyo';

UPDATE phones SET units_sold = 8543 WHERE name = 'N8';

-- Deleting records

DELETE FROM cities WHERE name = 'Tokyo';

DELETE FROM phones WHERE manufacturer = 'Samsung';
