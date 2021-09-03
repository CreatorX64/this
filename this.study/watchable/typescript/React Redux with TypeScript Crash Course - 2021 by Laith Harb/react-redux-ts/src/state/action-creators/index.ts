import { Dispatch } from "redux";
import { Action } from "../actions";
import { ActionType } from "../action-types";

export function depositMoney(amount: number) {
  return function (dispatch: Dispatch<Action>) {
    dispatch({
      type: ActionType.Deposit,
      payload: amount
    });
  };
}

export function withdrawMoney(amount: number) {
  return function (dispatch: Dispatch<Action>) {
    dispatch({
      type: ActionType.Withdraw,
      payload: amount
    });
  };
}

export function bankrupt() {
  return function (dispatch: Dispatch<Action>) {
    dispatch({
      type: ActionType.Bankrupt
    });
  };
}
