// React Testing Library with Jest is the most popular library combination for
// React testing. RTL provides relevant testing tools, while Jest has a general
// testing framework for test suites, test cases, assertions, and mocking
// capabilities. If you need an alternative to RTL, consider trying Enzyme by Airbnb.

import axios from "axios";
import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";

import App, {
  storiesReducer,
  Item,
  SearchForm,
  InputWithLabel,
  List
} from "./App";

jest.mock("axios");

//-- The “describe” block is our "test suite", and the “test” blocks are our
// "test cases". Large subjects like functions or components often require
// multiple test cases, so it makes sense to use them with test suites

describe("something truthy and falsy", () => {
  test("true to be true", () => {
    // "Test assertions" 👇
    // expect(true).toBe(true);
    expect(true).toBeTruthy();
  });

  test("false to be false", () => {
    // "Test assertions" 👇
    // expect(false).toBe(false);
    // expect(false).toBe(true);
    expect(false).toBeFalsy();
  });

  // The “test” block can also be written as an “it” block. The blocks have
  // the same purpose

  // it("true to be true", () => {
  //   expect(true).toBe(true);
  // });

  // it("false to be false", () => {
  //   expect(false).toBe(false);
  // });
});

//-- Test cases can be used without test suites

// test("true to be true", () => {
//   expect(true).toBe(true);
// });

// test("false to be false", () => {
//   expect(false).toBe(false);
// });

//-- Unit testing: Functions

const storyOne = {
  title: "React",
  url: "https://reactjs.org",
  author: "Jordan Walke",
  num_comments: 3,
  points: 4,
  objectID: 0
};

const storyTwo = {
  title: "Redux",
  url: "https://redux.js.org",
  author: "Dan Abramov, Andrew Clark",
  num_comments: 2,
  points: 5,
  objectID: 1
};

const stories = [storyOne, storyTwo];

describe("storiesReducer", () => {
  test("removes a story from all stories", () => {
    const action = { type: "REMOVE_STORY", payload: storyOne };
    const state = { data: stories, isLoading: false, isError: false };

    const newState = storiesReducer(state, action);

    const expectedState = {
      data: [storyTwo],
      isLoading: false,
      isError: false
    };

    // Also note that there is a toEqual function which works slightly
    // different than toStrictEqual: https://twitter.com/rwieruch/status/1260866850080067584
    expect(newState).toStrictEqual(expectedState);
  });

  test("sets fetch init state", () => {
    const action = { type: "STORIES_FETCH_INIT" };
    const state = { data: [], isLoading: false, isError: false };

    const newState = storiesReducer(state, action);

    const expectedState = {
      data: [],
      isLoading: true,
      isError: false
    };

    expect(newState).toStrictEqual(expectedState);
  });

  test("sets fetch success state", () => {
    const action = { type: "STORIES_FETCH_SUCCESS", payload: stories };
    const state = { data: [], isLoading: true, isError: false };

    const newState = storiesReducer(state, action);

    const expectedState = {
      data: stories,
      isLoading: false,
      isError: false
    };

    expect(newState).toStrictEqual(expectedState);
  });

  test("sets fetch failure state", () => {
    const action = { type: "STORIES_FETCH_FAILURE" };
    const state = { data: [], isLoading: true, isError: false };

    const newState = storiesReducer(state, action);

    const expectedState = {
      data: [],
      isLoading: false,
      isError: true
    };

    expect(newState).toStrictEqual(expectedState);
  });
});

//-- Unit testing: Components

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

//-- Integration testing: Components: React Testing Library adheres to a single
// core philosophy: instead of testing implementation details of React components,
// it tests how users interact with the application and if it works as expected.
// This becomes especially powerful for integration tests

describe("App", () => {
  test("succeeds fetching data", async () => {
    const promise = Promise.resolve({
      data: {
        hits: stories
      }
    });

    axios.get.mockImplementationOnce(() => promise);

    render(<App />);

    // Use getBy* to check if an element is in the document, using getBy* queries
    // when asserting if element is present, so if the element is not found the
    // error thrown will offer better info than asserting with other queries
    // which will not throw an error
    expect(screen.getByText(/Loading/)).toBeInTheDocument();

    // Even though our Promise above resolves immediately, React updates the UI
    // async. That's why we have to use act() before we assert that our results
    // are rendered. We pass in a dummy Promise in act() to make sure that all
    // promises (aka microtasks in the microtask queue) are resolved & UI is
    // updated before we assert anything regarding the updated UI
    await act(() => Promise.resolve());

    // Use queryBy* to check if an element is NOT in the document, using
    // queryBy* queries when asserting if element is not present, so the test
    // doesn't fail immediately when the element is not found and the
    // assertion can be executed properly
    expect(screen.queryByText(/Loading/)).toBeNull();

    // Assert whether or not fetched data gets rendered as expected
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Redux")).toBeInTheDocument();
    expect(screen.getAllByText("Dismiss").length).toBe(2);
  });

  test("fails fetching data", async () => {
    const promise = Promise.reject();

    axios.get.mockImplementationOnce(() => promise);

    render(<App />);

    expect(screen.getByText(/Loading/)).toBeInTheDocument();

    try {
      await act(() => Promise.resolve());
    } catch (error) {
      // Ignore errors
    } finally {
      expect(screen.queryByText(/Loading/)).toBeNull();
      expect(screen.getByText(/went wrong/)).toBeInTheDocument();
    }
  });

  test("removes a story", async () => {
    const promise = Promise.resolve({
      data: {
        hits: stories
      }
    });

    axios.get.mockImplementationOnce(() => promise);

    render(<App />);

    await act(() => Promise.resolve());

    expect(screen.getAllByText("Dismiss").length).toBe(2);
    expect(screen.getByText("Jordan Walke")).toBeInTheDocument();

    // Since the item with “Jordan Walke” is the first rendered item in the
    // list, it gets removed if we click the first “Dismiss” button
    fireEvent.click(screen.getAllByText("Dismiss")[0]);

    expect(screen.getAllByText("Dismiss").length).toBe(1);
    expect(screen.queryByText("Jordan Walke")).toBeNull();
  });

  test("searches for specific stories", async () => {
    const reactStoriesPromise = Promise.resolve({
      data: {
        hits: stories
      }
    });

    const anotherStory = {
      title: "JavaScript",
      url: "https://en.wikipedia.org/wiki/JavaScript",
      author: "Brendan Eich",
      num_comments: 15,
      points: 10,
      objectID: 3
    };

    const javaScriptStoriesPromise = Promise.resolve({
      data: {
        hits: [anotherStory]
      }
    });

    // Instead of mocking the request once with Jest, now we mock multiple requests
    axios.get.mockImplementation((url) => {
      if (url.includes("React")) {
        return reactStoriesPromise;
      }

      if (url.includes("JavaScript")) {
        return javaScriptStoriesPromise;
      }

      throw Error();
    });

    // Initial render
    render(<App />);

    // First data fetching

    await act(() => Promise.resolve());

    expect(screen.getByDisplayValue("React")).toBeInTheDocument();
    expect(screen.queryByDisplayValue("JavaScript")).toBeNull();
    expect(screen.getByText("Jordan Walke")).toBeInTheDocument();
    expect(screen.getByText("Dan Abramov, Andrew Clark")).toBeInTheDocument();
    expect(screen.queryByText("Branden Eich")).toBeNull();

    // User interaction: Search

    fireEvent.change(screen.getByDisplayValue("React"), {
      target: {
        value: "JavaScript"
      }
    });

    expect(screen.queryByDisplayValue("React")).toBeNull();
    expect(screen.getByDisplayValue("JavaScript")).toBeInTheDocument();

    fireEvent.submit(screen.getByText("Submit"));

    // Second data fetching

    await act(() => Promise.resolve());

    expect(screen.queryByText("Jordan Walke")).toBeNull();
    expect(screen.queryByText("Dan Abramov, Andrew Clark")).toBeNull();
    expect(screen.getByText("Brendan Eich")).toBeInTheDocument();
  });

  test("renders snapshot", () => {
    const promise = Promise.resolve({
      data: {
        hits: stories
      }
    });

    axios.get.mockImplementationOnce(() => promise);

    const { container } = render(<App />);

    act(() => Promise.resolve());

    expect(container).toMatchSnapshot();
  });
});

//-- Other snapshot tests (exercise)

describe("InputWithLabel", () => {
  const inputWithLabelProps = {
    children: "dummy-label-text",
    id: "dummy-id",
    value: "dummy-value"
  };

  test("renders snapshot", () => {
    const { container } = render(<InputWithLabel {...inputWithLabelProps} />);
    expect(container).toMatchSnapshot();
  });
});

describe("List", () => {
  test("renders snapshot", () => {
    const { container } = render(<List list={stories} />);
    expect(container).toMatchSnapshot();
  });
});
