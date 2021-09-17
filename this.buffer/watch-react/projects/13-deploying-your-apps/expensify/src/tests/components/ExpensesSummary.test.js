import { expect, test } from "@jest/globals";
import { shallow } from "enzyme";
import React from "react";
import { ExpensesSummary } from "../../components/ExpensesSummary";

test("should render ExpensesSummary with singe expense", () => {
  const wrapper = shallow(
    <ExpensesSummary expenseCount={1} expensesTotal={235} />
  );
  expect(wrapper).toMatchSnapshot();
});

test("should render ExpensesSummary with multiple expenses", () => {
  const wrapper = shallow(
    <ExpensesSummary expenseCount={23} expensesTotal={234234324} />
  );
  expect(wrapper).toMatchSnapshot();
});
