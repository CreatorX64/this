import { ActionType } from "../action-types";

export interface DepositAction {
  type: ActionType.Deposit;
  payload: number;
}

export interface WithdrawAction {
  type: ActionType.Withdraw;
  payload: number;
}

export interface BankruptAction {
  type: ActionType.Bankrupt;
}

export type Action = DepositAction | WithdrawAction | BankruptAction;
