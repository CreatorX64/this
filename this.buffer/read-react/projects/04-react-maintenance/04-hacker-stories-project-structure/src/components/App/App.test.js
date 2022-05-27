// React Testing Library with Jest is the most popular library combination for
// React testing. RTL provides relevant testing tools, while Jest has a general
// testing framework for test suites, test cases, assertions, and mocking
// capabilities. If you need an alternative to RTL, consider trying Enzyme by Airbnb.

import axios from "axios";
import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { storyOne, storyTwo, stories } from "../../dummy-data";
import App, { storiesReducer } from "./index";

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

  test("renders snapshot", async () => {
    const promise = Promise.resolve({
      data: {
        hits: stories
      }
    });

    axios.get.mockImplementationOnce(() => promise);

    const { container } = render(<App />);

    await act(() => Promise.resolve());

    expect(container).toMatchSnapshot();
  });
});
