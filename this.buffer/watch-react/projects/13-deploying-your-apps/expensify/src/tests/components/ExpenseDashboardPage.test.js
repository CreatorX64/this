import { expect, test } from "@jest/globals";
import { shallow } from "enzyme";
import React from "react";
import { ExpenseDashboardPage } from "../../components/ExpenseDashboardPage";

test("should render ExpenseDashboardPage", () => {
  const wrapper = shallow(<ExpenseDashboardPage />);
  expect(wrapper).toMatchSnapshot();
});
