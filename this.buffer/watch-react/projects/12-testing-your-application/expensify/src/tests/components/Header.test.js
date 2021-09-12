import { expect, test } from "@jest/globals";
import React from "react";
import ReactShallowRenderer from "react-test-renderer/shallow";
import { Header } from "../../components/Header";

test("should render Header", () => {
  const renderer = new ReactShallowRenderer();
  renderer.render(<Header />);
  expect(renderer.getRenderOutput()).toMatchSnapshot();
});
