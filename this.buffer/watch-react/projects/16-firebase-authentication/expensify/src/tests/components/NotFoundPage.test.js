import { expect, test } from "@jest/globals";
import { shallow } from "enzyme";
import React from "react";
import { NotFoundPage } from "../../components/NotFoundPage";

test("should render NotFoundPage", () => {
  const wrapper = shallow(<NotFoundPage />);
  expect(wrapper).toMatchSnapshot();
});
