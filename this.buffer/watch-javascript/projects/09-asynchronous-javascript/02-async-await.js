movePlayer(100, "Left")
  .then(() => movePlayer(400, "Left"))
  .then(() => movePlayer(10, "Right"))
  .then(() => movePlayer(330, "Left"));

async function playerStart() {
  await movePlayer(100, "Left");
  await movePlayer(400, "Left");
  await movePlayer(10, "Right");
  await movePlayer(330, "Left");
}

//----

async function fetchUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();
  console.log(data);
}

//----

const urls = [
  "https://jsonplaceholder.typicode.com/users",
  "https://jsonplaceholder.typicode.com/posts",
  "https://jsonplaceholder.typicode.com/albums"
];

async function getData() {
  try {
    const [users, posts, albums] = await Promise.all(
      urls.map((url) => fetch(url).then((res) => res.json()))
    );
    console.log(users);
    console.log(posts);
    console.log(albums);
  } catch (err) {
    console.log("Error:", err);
  }
}
