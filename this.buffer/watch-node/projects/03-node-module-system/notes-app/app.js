import chalk from "chalk";
import getNotes from "./notes.js";

const msg = getNotes();
console.log(msg);

const greenMsg = chalk.blue.inverse.bold("Error!");
console.log(greenMsg);