-- Joining data from different tables

SELECT contents, username
FROM comments
JOIN users ON users.id = comments.user_id;

SELECT contents, username, url
FROM comments
JOIN users ON users.id = comments.user_id
JOIN photos ON photos.id = comments.photo_id;

-- Challenge
SELECT title, name
FROM books
JOIN authors ON authors.id = books.author_id;

/*
Notes on joins:
- Table order between FROM and JOIN frequently makes a difference, we'll see later.
- We must give context if column names collide (users.id vs id).
- Tables can be renamed using the AS keyword.
- There are a few kinds of joins, we'll see later.
*/

SELECT comments.id AS comment_id, photos.id AS photo_id
FROM photos
JOIN comments ON photos.id = comments.photo_id;

SELECT comments.id AS comment_id, p.id AS photo_id
FROM photos AS p
JOIN comments ON p.id = comments.photo_id;

-- You can drop off AS when renaming a table for a result set, though you
-- should still use AS, it adds clarity.
SELECT comments.id AS comment_id, p.id AS photo_id
FROM photos p
JOIN comments ON p.id = comments.photo_id;

-- Imagine that when we execute this, every single photo has a user_id that
-- link up perfectly with the list of users.
SELECT url, username
FROM photos
JOIN users ON users.id = photos.user_id;

-- If we insert another row inside the photos table with an non-existent or
-- NULL user_id, the query above is NOT going to include this record in the
-- result set. The reason for that is becasue the type of join that we are
-- using (remember there are several types of joins). In this join, if there's
-- ever a row from our source table (photos) that does not match with a row
-- from the users, then that row gets dropped from the overall result set.
INSERT INTO photos (url, user_id)
VALUES ('http://banner.jpg', NULL);

-- Four kinds of joins:
--   Inner join (the join we've been using this far)
--   Left outer join
--   Right outer join
--   Full join

-- Inner join: Merges the tables, drops rows that don't match up to a row in
-- the other table.
SELECT url, username
FROM photos
JOIN users ON users.id = photos.user_id;
-- Alternatively, you can say INNER JOIN
-- INNER JOIN users ON users.id = photos.user_id;

-- Left outer join: If any row from the source table does not match up to a row
-- from the other table, it doesn't get dropped off. The reverse is not true, if
-- there are rows in the other table that don't match up with a row from the
-- source table, they will get dropped off from the result set.
SELECT url, username
FROM photos
LEFT JOIN users ON users.id = photos.user_id;

-- Right outer join: Exact opposite of left outer join. 
SELECT url, username
FROM photos
RIGHT JOIN users ON users.id = photos.user_id;

-- Full join: Includes all the rows from both tables in the result set,
-- including rows that don't have a match in the opposite table.
SELECT url, username
FROM photos
FULL JOIN users ON users.id = photos.user_id;

/*
Note on join table order:
  As hinted earlier, in some cases the order of tables in FROM and JOIN makes
  a difference. One such case is the usage of left outer join and right outer
  join. Because in both of left & right outer joins, it's important which
  table is the source table and which is the opposite table as unmatching
  rows from one of those tables will be included depending on if that table
  is the source table or not.
*/

-- WHERE with JOIN

SELECT
  url,
  contents
FROM
  comments
  JOIN photos ON photos.id = comments.photo_id
WHERE
  comments.user_id = photos.user_id;

-- Three way JOIN
SELECT
  url,
  contents,
  username
FROM
  comments
  JOIN photos ON photos.id = comments.photo_id
  JOIN users ON users.id = comments.user_id AND users.id = photos.user_id;

-- Challenge: Write a query to see if any authors are writing their own reviews
-- for books. Write a query that returns the title of each book, along with the
-- name of the author, and the rating of the review. Only show rows where the
-- author of the books is also the author of the review.
SELECT
  title,
  name,
  rating
FROM
  reviews
  JOIN books ON books.id = reviews.book_id
  JOIN authors ON authors.id = books.author_id
      AND authors.id = reviews.reviewer_id;
