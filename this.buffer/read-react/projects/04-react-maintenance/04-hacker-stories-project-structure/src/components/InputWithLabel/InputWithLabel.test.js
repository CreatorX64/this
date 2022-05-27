import { render } from "@testing-library/react";
import InputWithLabel from "./index";

describe("InputWithLabel", () => {
  const inputWithLabelProps = {
    children: "dummy-label-text",
    id: "dummy-id",
    value: "dummy-value"
  };

  test("renders snapshot", () => {
    const onInputChange = jest.fn();
    const { container } = render(
      <InputWithLabel {...inputWithLabelProps} onInputChange={onInputChange} />
    );
    expect(container).toMatchSnapshot();
  });
});
