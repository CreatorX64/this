import { Dispatch } from "redux";
import { ActionType } from "../action-types";
import { BankruptAction, DepositAction, WithdrawAction } from "../actions";

export const depositMoney = (amount: number) => {
  return (dispatch: Dispatch<DepositAction>) => {
    dispatch({
      type: ActionType.DEPOSIT,
      payload: amount
    });
  };
};

export const withdrawMoney = (amount: number) => {
  return (dispatch: Dispatch<WithdrawAction>) => {
    dispatch({
      type: ActionType.WITHDRAW,
      payload: amount
    });
  };
};

export const bankrupt = () => {
  return (dispatch: Dispatch<BankruptAction>) => {
    dispatch({
      type: ActionType.BANKRUPT
    });
  };
};
