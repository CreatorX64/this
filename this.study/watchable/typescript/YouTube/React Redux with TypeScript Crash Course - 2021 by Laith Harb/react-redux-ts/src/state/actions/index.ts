import { ActionType } from "../action-types";

export interface DepositAction {
  type: ActionType.DEPOSIT;
  payload: number;
}

export interface WithdrawAction {
  type: ActionType.WITHDRAW;
  payload: number;
}

export interface BankruptAction {
  type: ActionType.BANKRUPT;
}

export type Action = DepositAction | WithdrawAction | BankruptAction;
