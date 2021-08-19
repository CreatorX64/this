import * as fs from "fs";

// const book = {
//   title: "Ego is the Enemy",
//   author: "Ryan Holiday"
// };

// const bookJSON = JSON.stringify(book);
// fs.writeFileSync("01-book.json", bookJSON);

// const dataBuffer = fs.readFileSync("01-book.json");
// const dataJSON = dataBuffer.toString();
// const data = JSON.parse(dataJSON);
// console.log(data.title);

// Challenge

const dataBuffer = fs.readFileSync("01-user.json");
const dataJSON = dataBuffer.toString();
const data = JSON.parse(dataJSON);

data.name = "Hakan";
data.planet = "Earth";
data.age = 25;

const userJSON = JSON.stringify(data);
fs.writeFileSync("01-user.json", userJSON);