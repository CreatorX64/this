import { shallow } from "enzyme";
import { beforeEach, expect, jest, test } from "@jest/globals";
import React from "react";
import { EditExpensePage } from "../../components/EditExpensePage";
import { ExpenseForm } from "../../components/ExpenseForm";
import { expenses } from "../fixtures/expenses";

let startEditExpense, expense, history, match, startRemoveExpense, wrapper;

beforeEach(() => {
  expense = expenses[2];
  match = { params: { id: expense.id } };
  startEditExpense = jest.fn();
  startRemoveExpense = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(
    <EditExpensePage
      expense={expense}
      startEditExpense={startEditExpense}
      startRemoveExpense={startRemoveExpense}
      history={history}
      match={match}
    />
  );
});

test("should render EditExpensePage", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should handle edit expense", () => {
  wrapper.find(ExpenseForm).prop("onSubmit")(expense);
  expect(startEditExpense).toHaveBeenLastCalledWith(expense.id, expense);
  expect(history.push).toHaveBeenLastCalledWith("/");
});

test("should handle remove expense", () => {
  wrapper.find("button").simulate("click");
  expect(startRemoveExpense).toHaveBeenLastCalledWith(expense.id);
  expect(history.push).toHaveBeenLastCalledWith("/");
});
