import https from "https";

const url = "https://jsonplaceholder.typicode.com/todos/3";

const request = https.request(url, (response) => {
  let data = "";

  response.on("data", (chunk) => {
    data += chunk.toString();
  });

  response.on("end", () => {
    const body = JSON.parse(data);
    console.log(body);
  });
});

request.on("error", (error) => {
  console.log("An error:", error);
});

request.end();

// Node.js doesn't have the Fetch API like the browser does, so we need to
// use the core http/https modules in order to make HTTP requests to
// external resources.
