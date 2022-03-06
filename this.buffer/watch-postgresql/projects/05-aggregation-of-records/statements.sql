/*
Grouping:
- Reduces many rows down to fewer rows.
- Done by using the "GROUP BY" keyword.
- Visualizing the result is key to use.

Aggregates:
- Reduces many values down to one.
- Done by using "aggregate functions".
*/

-- We have around 100 different comments, but the following query will return
-- a result set of size 5 (which is the number of unique user_id's). Here's
-- what happens behind the scenes: The database finds set of all unique user_id's,
-- then takes each row and assigns it to a group based on its user_id.
SELECT user_id
FROM comments
GROUP BY user_id;

-- However, there's a catch: Only columns that appear in the GROUP BY clause can
-- be selected (rewatch lecture 62 if you don't remember why). Other columns can
-- only be used in an aggregate function (see later). For instance, the following
-- query will not work:
SELECT contents
FROM comments
GROUP BY user_id;

/*
Some aggregate functions:
- COUNT()    Returns the number of values in a group of values (NULL values are not counted).
- SUM()      Finds the sum of a group of numbers.
- AVG()      Finds the average of a group of numbers.
- MIN()      Returns the minimum value from a group of numbers.
- MAX()      Returns the maximum value from a group of numbers.
*/

SELECT MAX(id) FROM comments;

SELECT MIN(id) FROM comments;

SELECT AVG(id) FROM comments;

SELECT COUNT(id) FROM comments;

SELECT SUM(id) FROM comments;

-- When using aggregate functions, we do a normal SELECT next to it. The
-- following won't work:
SELECT SUM(id), id FROM comments;

-- We use aggregate functions either by themselves (see above), or as a part of
-- a larger GROUP BY statement.

-- When we use aggregate functions while doint GROUP BY, the aggregate function
-- is only going to be applied to each individual group. The following query
-- retrieves the number of comments each user has created:
SELECT user_id, COUNT(id) AS num_comments_created
FROM comments
GROUP BY user_id;

-- NULL values are not counted in COUNT() aggregate function. If you want to get
-- the row size regardless of whether a column is NULL or not, instead of using
-- a column label inside the COUNT() function, you can use * character. Generally,
-- when we make use of COUNT, we'll use * instead of a column label.

SELECT COUNT(*) FROM photos;

SELECT user_id, COUNT(*) AS num_comments_created
FROM comments
GROUP BY user_id;

-- Find the number of comments for each photo:
SELECT
  photo_id,
  COUNT(*) AS comment_count
FROM
  comments
GROUP BY
  photo_id;

-- Challenge: Write a query that will print an author's id and the number of
-- books they have authored.
SELECT
  author_id,
  COUNT(*)
FROM
  books
GROUP BY
  author_id;

-- Challenge: Write a query that will print an author's name and the number of
-- books they have authored.
SELECT
  authors.name,
  COUNT(*)
FROM
  books
  JOIN authors ON authors.id = books.author_id
GROUP BY
  authors.name;

/*
Until this point, we've seen several SQL keywords. These keywords will always
appear in a very specific order:

  1) FROM        Specifies set of rows to work with.

  2) JOIN        Merges in data from additional tables.

  3) WHERE       Filters the set of rows.

  4) GROUP BY    Groups rows by a unique set of values.
  
  5) HAVING      Filters the set of groups. Difference between WHERE and HAVING
                 is that WHERE is going to filter out some set of rows, whereas
                 HAVING is going to filter out some number of groups. That's why
                 you'll never see a HAVING without a GROUP BY (see below).
*/

-- Find the number of comments for each photo where the photo_id is less than 3
-- and the photo has more than 2 comments.
SELECT
  photo_id,
  COUNT(*)
FROM
  comments
WHERE
  photo_id < 3
GROUP BY
  photo_id
HAVING
  COUNT(*) > 2;

-- Find the users (user_ids) where the user has commented on the first 50 photos
-- and the user added more than 20 comments on those photos.
SELECT
  user_id,
  COUNT(*)
FROM
  comments
WHERE
  photo_id <= 50
GROUP BY
  user_id
HAVING
  COUNT(*) > 20;

-- Challenge
SELECT
  manufacturer,
  SUM(price * units_sold)
FROM
  phones
GROUP BY
  manufacturer
HAVING
  SUM(price * units_sold) > 2000000;
