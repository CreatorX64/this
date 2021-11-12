import { RequestHandler } from "express";
import { Todo } from "../models/Todo";

const todos: Todo[] = [];

interface CreateResBody {
  message: string;
  createdTodo: Todo;
}

interface CreateReqBody {
  text: string;
}

interface UpdateParams {
  id: string;
}

interface UpdateReqBody {
  text: string;
}

interface UpdateResBody {
  message: string;
  updateTodo: Todo;
}

interface DeleteParams {
  id: string;
}

interface DeleteResBody {
  message: string;
}

export const createTodo: RequestHandler<null, CreateResBody, CreateReqBody> = (
  req,
  res,
  _3
) => {
  const { text } = req.body;
  const newTodo = new Todo(Math.random().toString(), text);
  todos.push(newTodo);
  res.status(201).json({ message: "Created the todo.", createdTodo: newTodo });
};

export const getTodos: RequestHandler = (_1, res, _3) => {
  res.json({ todos });
};

export const updateTodo: RequestHandler<
  UpdateParams,
  UpdateResBody,
  UpdateReqBody
> = (req, res, _3) => {
  const todoId = req.params.id;
  const updatedText = req.body.text;
  const todoIndex = todos.findIndex((todo) => todo.id === todoId);

  if (todoIndex < 0) {
    throw new Error("Could not find todo with the given id.");
  }

  todos[todoIndex] = new Todo(todos[todoIndex].id, updatedText);

  res.json({ message: "Updated todo.", updateTodo: todos[todoIndex] });
};

export const deleteTodo: RequestHandler<DeleteParams, DeleteResBody> = (
  req,
  res,
  _3
) => {
  const todoId = req.params.id;
  const todoIndex = todos.findIndex((todo) => todo.id === todoId);

  if (todoIndex < 0) {
    throw new Error("Could not find todo with the given id.");
  }

  todos.splice(todoIndex, 1);

  res.json({ message: "Todo deleted." });
};
