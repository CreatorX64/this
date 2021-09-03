import { ActionType } from "../action-types";
import { Action } from "../actions";

const initialState = 0;

export function bankReducer(state: number = initialState, action: Action) {
  switch (action.type) {
    case ActionType.Deposit:
      return state + action.payload;
    case ActionType.Withdraw:
      return state - action.payload;
    case ActionType.Bankrupt:
      return 0;
    default:
      return state;
  }
}
