import { shallow } from "enzyme";
import { expect, test } from "@jest/globals";
import React from "react";
import { LoginPage } from "../../components/LoginPage";

test("should render LoginPage", () => {
  const wrapper = shallow(<LoginPage />);
  expect(wrapper).toMatchSnapshot();
});

test("should call startLogin on button click", () => {
  const startLoginSpy = jest.fn();
  const wrapper = shallow(<LoginPage startLogin={startLoginSpy} />);
  wrapper.find("button").simulate("click");
  expect(startLoginSpy).toHaveBeenCalled();
});
