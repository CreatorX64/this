-- Setting up a table with a primary key
CREATE TABLE users (
	id SERIAL PRIMARY KEY,
  username VARCHAR(50)
);
/*
SERIAL means that we want PostgreSQL to automatically generate a new value for
the id column starting from 1 and increment it for each new record. No new
record will ever have the same id of a record created at a point in time, even
if that record is now deleted and the id is unused. PRIMARY KEY part makes
lookups better when using the id column among other things (which we'll get
into later).
*/

INSERT INTO
  users (username)
VALUES
  ('monahan93'),
  ('pferrer'),
  ('si93onis'),
  ('99stroman');

-- Setting up a table with primary key and foreign key
CREATE TABLE photos (
	id SERIAL PRIMARY KEY,
  url VARCHAR(200),
  user_id INTEGER REFERENCES users(id)
);
/*
One thing that REFERENCES part does for us is to make sure the record we're
creating has a foreign id that actually exist in the referenced table, this
prevents us from entering a record into photos that doesn't match with an
existing user on our users table. By default, it also prevents us from deleting
a user before deleting that user's photos from the photos table. 
*/

INSERT INTO
  photos (url, user_id)
VALUES
  ('http;//one.jpg', 4);

INSERT INTO
  photos (url, user_id)
VALUES
  ('http://two.jpg', 1),
  ('http://25.jpg', 1),
  ('http://36.jpg', 1),
  ('http://754.jpg', 2),
  ('http://35.jpg', 3),
  ('http://256.jpg', 4);

SELECT * FROM photos WHERE user_id = 4;

-- We'll study JOIN in detail later, this is just a preview
SELECT url, username FROM photos
JOIN users ON users.id = photos.user_id;

-- Enter a record into photos that doesn't reference any user
INSERT INTO photos (url, user_id)
VALUES ('http://some.jpg', NULL);

-- Delete a table & all of the records inside of it
DROP TABLE photos;

/*
Constraints Around Deletion
  
  ON DELETE RESTRICT       Throw an error
  ON DELETE NO ACTION      Throw an error
  ON DELETE CASCADE        Delete the photo too
  ON DELETE SET NULL       Set the "user_id" of the photo to NULL
  ON DELETE SET DEFAULT    Set the "user_id" of the photo to a default value, if one is provided
*/

CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  url VARCHAR(200),
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  url VARCHAR(200),
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL
);
