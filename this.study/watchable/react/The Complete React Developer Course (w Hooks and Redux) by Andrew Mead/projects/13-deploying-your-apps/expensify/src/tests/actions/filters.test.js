import { expect, test } from "@jest/globals";
import { DateTime } from "luxon";
import {
  setStartDate,
  setEndDate,
  setTextFilter,
  sortByAmount,
  sortByDate
} from "../../actions";

test("should generate set start date action object", () => {
  const action = setStartDate(DateTime.fromMillis(0));
  expect(action).toEqual({
    type: "SET_START_DATE",
    startDate: DateTime.fromMillis(0)
  });
});

test("should generate set end date action object", () => {
  const action = setEndDate(DateTime.fromMillis(0));
  expect(action).toEqual({
    type: "SET_END_DATE",
    endDate: DateTime.fromMillis(0)
  });
});

test("should generate set text filter action object w/ text arg", () => {
  const text = "Something in";
  const action = setTextFilter(text);
  expect(action).toEqual({
    type: "SET_TEXT_FILTER",
    text
  });
});

test("should generate set text filter action object w/o text arg", () => {
  const action = setTextFilter();
  expect(action).toEqual({
    type: "SET_TEXT_FILTER",
    text: ""
  });
});

test("should generate sort by amount action object", () => {
  expect(sortByAmount()).toEqual({
    type: "SORT_BY_AMOUNT"
  });
});

test("should generate sort by date action object", () => {
  expect(sortByDate()).toEqual({
    type: "SORT_BY_DATE"
  });
});
