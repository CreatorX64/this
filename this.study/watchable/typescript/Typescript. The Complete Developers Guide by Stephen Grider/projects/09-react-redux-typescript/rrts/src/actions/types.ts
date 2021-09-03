import { FetchTodosAction, DeleteTodoAction } from "./todos";

export enum ActionType {
  FetchTodos,
  DeleteTodo
}

export type Action = FetchTodosAction | DeleteTodoAction;
