// finally() in Promises

const urls = [
  "https://swapi.co/api/people/1",
  "https://swapi.co/api/people/2",
  "https://swapi.co/api/people/3",
  "https://swapi.co/api/people/4"
];

Promise.all(
  urls.map((url) => {
    return fetch(url).then((people) => people.json());
  })
)
  .then((array) => {
    console.log("1", array[0]);
    console.log("2", array[1]);
    console.log("3", array[2]);
    console.log("4", array[3]);
  })
  .catch((err) => console.log("Error:", err))
  .finally(() => console.log("THE END! Let's cleanup etc."));

// for await of

async function getData() {
  const arrayOfPromises = urls.map((url) => fetch(url));
  for await (let req of arrayOfPromises) {
    const data = await req.json();
    console.log(data);
  }
}
