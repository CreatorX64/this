/*
"Set operator" is a keyword that's going to try to join together different
sets of data. Set operators in PostgreSQL include:

    UNION            Join together the results of two queries and remove
                     duplicate rows.

    UNION ALL        Join together the results of two queries.

    INTERSECT        Find the rows common in the results of two queries.
                     Remove duplicates.

    INTERSECT ALL    Find the rows common in the results of two queries.

    EXCEPT           Find the rows that are present in first query but not
                     second query. Remove duplicates.

    EXCEPT ALL       Find the rows that are present in first query but not
                     second query.
*/

-- Find the 4 products with the highest price.
SELECT *
FROM products
ORDER BY price DESC
LIMIT 4;

-- Find the 4 products with the highest price/weight ratio.
SELECT *
FROM products
ORDER BY price / weight DESC
LIMIT 4;

-- We want to somehow combine the results of both queries above, so that we can
-- find the 4 products with the highest price AND the 4 products with the
-- highest price/weight ratio. This is where the UNION keyword helps.

-- The UNION keyword takes the result set of one query, and appends it to the
-- result set of another query. If a record is present in multiple queries
-- that are combined by UNION, the record will only show once in the total
-- result set, so there are no duplicate records.
(
  SELECT *
  FROM products
  ORDER BY price DESC
  LIMIT 4
)
UNION
(
  SELECT *
  FROM products
  ORDER BY price / weight DESC
  LIMIT 4
);

-- If you don't want duplicate rows to be removed from the total result set, add
-- the ALL keyword next to UNION.
(
  SELECT *
  FROM products
  ORDER BY price DESC
  LIMIT 4
)
UNION ALL
(
  SELECT *
  FROM products
  ORDER BY price / weight DESC
  LIMIT 4
);

-- The brackets around UNION queries are only required when there are additional
-- clauses in the queries which might be ambiguous, like an ORDER BY clause
-- which can apply either for a specific query in the union or the total result
-- set. In cases where there're no ambiguity, brackets can be removed.
SELECT * FROM products
UNION
SELECT * FROM products;

-- We're only allowed to use the UNION keyword between the results of two
-- queries where the results have the same columns. The name of the columns
-- and the data type of those columns must be same.

-- The following will not work:
SELECT * FROM products
UNION
SELECT * FROM users;

-- This will not work either:
SELECT name FROM products
UNION
SELECT price FROM products;

-- Using the INTERSECT set operator

(
  SELECT *
  FROM products
  ORDER BY price DESC
  LIMIT 4
)
INTERSECT
(
  SELECT *
  FROM products
  ORDER BY price / weight DESC
  LIMIT 4
);

-- Note that INTERSECT ALL will keep the duplicates in the sense that if a record
-- appears in both queries more than one time. If a record appears in each queriy
-- only one time, that's one intersection. If a record appears in each query more
-- than one time, that's N number of intersections. In that case, INTERSECT will
-- return that records only once, whereas INTERSECT ALL will return that record
-- N times.
(
  SELECT *
  FROM products
  ORDER BY price DESC
  LIMIT 4
)
INTERSECT ALL
(
  SELECT *
  FROM products
  ORDER BY price / weight DESC
  LIMIT 4
);

-- Note that the EXCEPT set operator is only concerned with the first query.
-- It's not an operator that returns the total difference from both queries,
-- it only returns the records from first query - matching records from
-- second query. In other set operators (UNION, INTERSECT) the order of the
-- queries doesn't matter. In EXCEPT, it matters.

(
  SELECT *
  FROM products
  ORDER BY price DESC
  LIMIT 4
)
EXCEPT
(
  SELECT *
  FROM products
  ORDER BY price / weight DESC
  LIMIT 4
);

-- Challenge: Write a query that will print the manufacturer of phones where
-- phone's price is less than 170. Also print all manufacturer that have created
-- more than 2 phones.
(
  SELECT manufacturer
  FROM phones
  WHERE price < 170
)
UNION
(
  SELECT manufacturer
  FROM phones
  GROUP BY manufacturer
  HAVING COUNT(*) > 2
);
