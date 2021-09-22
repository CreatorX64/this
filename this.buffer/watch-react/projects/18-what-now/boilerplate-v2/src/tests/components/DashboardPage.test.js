import { expect, test } from "@jest/globals";
import { shallow } from "enzyme";
import React from "react";
import { DashboardPage } from "../../components/DashboardPage";

test("should render DashboardPage", () => {
  const wrapper = shallow(<DashboardPage />);
  expect(wrapper).toMatchSnapshot();
});
