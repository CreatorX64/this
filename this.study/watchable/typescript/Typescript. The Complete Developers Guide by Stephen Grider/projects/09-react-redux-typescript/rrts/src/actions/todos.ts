import axios from "axios";
import { Dispatch } from "redux";
import { ActionType } from "./types";

const url = "https://jsonplaceholder.typicode.com/todos";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export interface FetchTodosAction {
  type: ActionType.FetchTodos;
  payload: Todo[];
}

export interface DeleteTodoAction {
  type: ActionType.DeleteTodo;
  payload: number;
}

export function fetchTodos() {
  return async function (dispatch: Dispatch): Promise<void> {
    const response = await axios.get<Todo[]>(url);
    dispatch<FetchTodosAction>({
      type: ActionType.FetchTodos,
      payload: response.data
    });
  };
}

export const deleteTodo = function (id: number): DeleteTodoAction {
  return {
    type: ActionType.DeleteTodo,
    payload: id
  };
};
