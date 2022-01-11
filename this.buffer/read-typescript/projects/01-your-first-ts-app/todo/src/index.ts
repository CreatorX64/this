import { TodoItem } from "./TodoItem";
import { TodoCollection } from "./TodoCollection";

let todos: TodoItem[] = [
  new TodoItem(1, "Buy flowers"),
  new TodoItem(2, "Get shoes"),
  new TodoItem(3, "Collect tickets"),
  new TodoItem(4, "Call Joe", true)
];

let collection: TodoCollection = new TodoCollection("Hakan", todos);

console.clear();
console.log(`${collection.userName}'s Todo List`);

let newId: number = collection.addTodo("Go for run");
let todoItem: TodoItem = collection.getTodoById(newId);
todoItem.printDetails();

// collection.addTodo(todoItem); // Error!
