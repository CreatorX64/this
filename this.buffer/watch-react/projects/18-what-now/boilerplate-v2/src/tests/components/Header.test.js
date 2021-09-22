import { expect, jest, test } from "@jest/globals";
import React from "react";
import { shallow } from "enzyme";
import { Header } from "../../components/Header";

test("should render Header", () => {
  // Using enzyme
  const wrapper = shallow(<Header startLogout={() => {}} />);
  expect(wrapper).toMatchSnapshot();
  // expect(wrapper.find("h1").length).toBe(1);
  // expect(wrapper.find("h1").text()).toBe("Expensify");

  // Using react-test-renderer
  // const renderer = new ReactShallowRenderer();
  // renderer.render(<Header />);
  // expect(renderer.getRenderOutput()).toMatchSnapshot();
});

test("should call startLogout on button click", () => {
  const startLogoutSpy = jest.fn();
  const wrapper = shallow(<Header startLogout={startLogoutSpy} />);
  wrapper.find("button").simulate("click");
  expect(startLogoutSpy).toHaveBeenCalled();
});
