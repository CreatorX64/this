import { render, screen, fireEvent } from "@testing-library/react";
import { storyOne, stories } from "../../dummy-data";
import List, { Item } from "./index";

describe("List", () => {
  test("renders snapshot", () => {
    const { container } = render(<List list={stories} />);
    expect(container).toMatchSnapshot();
  });
});

describe("Item", () => {
  test("renders all properties", () => {
    render(<Item item={storyOne} />);

    // The debug() function logs the rendered component to the console. You
    // should form the habit of using RTL’s debug function whenever you
    // render a new component in a React component test. The function gives
    // a useful overview of what is rendered and informs the best way to
    // proceed with testing
    // screen.debug();

    expect(screen.getByText("Jordan Walke")).toBeInTheDocument();
    expect(screen.getByText("React")).toHaveAttribute(
      "href",
      "https://reactjs.org"
    );
  });

  test("renders a clickable dismiss button", () => {
    render(<Item item={storyOne} />);

    // The getByRole function is usually used to retrieve elements by aria-label
    // attributes. However, there are also implicit roles on HTML elements – like
    // button for a button element. Thus you can select elements not only by visible
    // text, but also by their (implicit) accessibility role with React Testing
    // Library. A neat feature of getRoleBy is that it suggests roles if you provide
    // a role that’s not available. Both, getByText and getByRole are RTL’s most
    // widely used search functions
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("clicking the dismiss button calls the callback handler", () => {
    // Create mock/spy/stub function
    const handleRemoveItem = jest.fn();

    // Provide the mock function as a callback handler to Item component
    render(<Item item={storyOne} onRemoveItem={handleRemoveItem} />);

    // Fire click event on the button
    fireEvent.click(screen.getByRole("button"));

    expect(handleRemoveItem).toHaveBeenCalledTimes(1);
  });

  test("renders snapshot", () => {
    const { container } = render(<Item item={storyOne} />);
    expect(container).toMatchSnapshot();
  });
});
