-- Challenge: Write a query to print the number of paid and unpaid orders.

SELECT
  paid,
  COUNT(*)
FROM
  orders
GROUP BY
  paid;

-- Challenge: Join together the users and orders tables. Print the first_name
-- and last_name of each user, then whether or not they have paid for their order.

SELECT
  first_name,
  last_name,
  paid
FROM
  users
  JOIN orders ON orders.user_id = users.id;
