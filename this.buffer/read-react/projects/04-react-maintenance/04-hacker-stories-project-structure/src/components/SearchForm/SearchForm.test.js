import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchForm from "./index";

describe("SearchForm", () => {
  const searchFormProps = {
    searchTerm: "React",
    onSearchInput: jest.fn(),
    onSearchSubmit: jest.fn()
  };

  test("renders the input field with its value", () => {
    render(<SearchForm {...searchFormProps} />);

    expect(screen.getByDisplayValue("React")).toBeInTheDocument();
  });

  test("renders the correct label", () => {
    render(<SearchForm {...searchFormProps} />);

    // getByLabelText search function allows us to find an element by a label
    // in a form. This is useful for components that render multiple labels
    // and HTML controls
    expect(screen.getByLabelText(/Search/)).toBeInTheDocument();
  });

  test("calls onSearchInput on input field change", () => {
    render(<SearchForm {...searchFormProps} />);

    fireEvent.change(screen.getByDisplayValue("React"), {
      target: { value: "Redux" }
    });

    expect(searchFormProps.onSearchInput).toHaveBeenCalledTimes(1);
  });

  test("calls onSearchSubmit on button submit click", () => {
    render(<SearchForm {...searchFormProps} />);

    fireEvent.submit(screen.getByRole("button"));

    expect(searchFormProps.onSearchSubmit).toHaveBeenCalledTimes(1);
  });

  // Snapshot testing: Facebook created snapshot tests as a more lightweight way
  // to test React components and their structure. A snapshot test creates an
  // instance of your rendered component’s output as HTML elements and their structure.
  // This snapshot is compared to the same snapshot in the next test to give more
  // output on how the rendered component changed and show why any tests failed in
  // the difference. You can accept or deny any differences in your source code until
  // the component functions as intended
  test("renders snapshot", () => {
    const { container } = render(<SearchForm {...searchFormProps} />);
    expect(container).toMatchSnapshot();
  });
});
