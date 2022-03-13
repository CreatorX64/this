-- By default, ORDER BY sorts in ascending order. To be explicit, you can add
-- the ASC keyword.
SELECT * FROM products ORDER BY price;
SELECT * FROM products ORDER BY price ASC;

-- Add the DESC keyword to sort in descending order.
SELECT * FROM products ORDER BY price DESC;

-- There are several variations on sorting: Sorting numerical values, textual
-- values, or sorting rows on multiple properties.

-- When applied to a column that holds text, ORDER BY sorts in alphabetical order.
SELECT * FROM products ORDER BY name;
SELECT * FROM products ORDER BY name ASC;
SELECT * FROM products ORDER BY name DESC;

-- We can sort rows by multiple properties. If the first property of a set of
-- rows have the same value, then the next property will be checked for
-- sorting, and so on.
SELECT * FROM products ORDER BY price, weight;
SELECT * FROM products ORDER BY price, weight DESC;
SELECT * FROM products ORDER BY price DESC, weight DESC;
SELECT * FROM products ORDER BY price DESC, weight ASC;

-- OFFSET: We make use of this keyword when we want to skip a number of records
-- in the result set. The following query will skip the first 40 users.
SELECT * FROM users OFFSET 40;

-- LIMIT: Using this keyword is going to constrain the number of records we get
-- back in result of a query.
SELECT * FROM users LIMIT 5;
-- We can limit by a number of records greater than our actual row size. All
-- rows'll be returned and there'll be no errors.
SELECT * FROM users LIMIT 999;

-- Note: LIMIT and OFFSET are frequently used together. By convention, LIMIT
-- comes first in a query that makes use of the two keywords. However, the
-- order of the keywords doesn't make a difference in the result set.

-- Select the 5 least expensive products
SELECT * FROM products ORDER BY price LIMIT 5;

-- Select the 5 most expensive products
SELECT *
FROM products
ORDER BY price DESC
LIMIT 5;

-- Select the 5 most expensive products except the most expensive one
SELECT *
FROM products
ORDER BY price DESC
LIMIT 5
OFFSET 1;

-- LIMIT is used in cases where we want to find out the most/least of
-- something, as seen from the examples above.

-- OFFSET is frequently used with LIMIT to achieve pagination for a user.

-- Page 1 products
SELECT *
FROM products
ORDER BY price
LIMIT 20
OFFSET 0;

-- Page 2 products
SELECT *
FROM products
ORDER BY price
LIMIT 20
OFFSET 20;

-- Page 3 products
SELECT *
FROM products
ORDER BY price
LIMIT 20
OFFSET 40;

-- Challenge: Write a query that shows the names of only the second and third
-- most expensive phones.

SELECT name
FROM phones
ORDER BY price DESC
LIMIT 2
OFFSET 1;
