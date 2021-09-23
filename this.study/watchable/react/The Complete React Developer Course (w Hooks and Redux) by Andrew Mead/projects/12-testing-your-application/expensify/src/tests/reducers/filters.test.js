import { expect, test } from "@jest/globals";
import { DateTime } from "luxon";
import { filtersReducer, filtersDefaults } from "../../reducers/filters";
import {
  INIT,
  SET_END_DATE,
  SET_START_DATE,
  SET_TEXT_FILTER,
  SORT_BY_AMOUNT,
  SORT_BY_DATE
} from "../../actions";

test("should setup default filter values", () => {
  const state = filtersReducer(undefined, { type: INIT });
  expect(state).toEqual({ ...filtersDefaults });
});

test("should set sortBy to amount", () => {
  const state = filtersReducer(undefined, { type: SORT_BY_AMOUNT });
  expect(state.sortBy).toBe("amount");
});

test("should set sortBy to date", () => {
  const currentState = {
    ...filtersDefaults,
    sortBy: "amount"
  };
  const action = { type: SORT_BY_DATE };
  const state = filtersReducer(currentState, action);
  expect(state.sortBy).toBe("date");
});

test("should set text filter", () => {
  const text = "This is my filter";
  const action = { type: SET_TEXT_FILTER, text };
  const state = filtersReducer(undefined, action);
  expect(state.text).toBe(text);
});

test("should set startDate filter", () => {
  const startDate = DateTime.now();
  const action = { type: SET_START_DATE, startDate };
  const state = filtersReducer(undefined, action);
  expect(state.startDate).toEqual(startDate);
});

test("should set endDate filter", () => {
  const endDate = DateTime.now();
  const action = { type: SET_END_DATE, endDate };
  const state = filtersReducer(undefined, action);
  expect(state.endDate).toEqual(endDate);
});
