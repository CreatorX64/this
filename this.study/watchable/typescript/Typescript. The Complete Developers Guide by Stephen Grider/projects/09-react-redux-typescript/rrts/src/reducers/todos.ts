import { Action, ActionType, Todo } from "../actions";

export function todosReducer(state: Todo[] = [], action: Action): Todo[] {
  switch (action.type) {
    case ActionType.FetchTodos:
      return action.payload;
    case ActionType.DeleteTodo:
      return state.filter((todo: Todo) => todo.id !== action.payload);
    default:
      return state;
  }
}
