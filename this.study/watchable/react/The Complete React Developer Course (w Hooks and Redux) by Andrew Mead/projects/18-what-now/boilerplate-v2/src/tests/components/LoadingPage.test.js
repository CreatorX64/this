import { shallow } from "enzyme";
import { expect, test } from "@jest/globals";
import React from "react";
import { LoadingPage } from "../../components/LoadingPage";

test("should render LoadingPage", () => {
  const wrapper = shallow(<LoadingPage />);
  expect(wrapper).toMatchSnapshot();
});
