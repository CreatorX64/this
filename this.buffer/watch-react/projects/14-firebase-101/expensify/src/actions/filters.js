import {
  SET_TEXT_FILTER,
  SORT_BY_AMOUNT,
  SORT_BY_DATE,
  SET_START_DATE,
  SET_END_DATE
} from "./types";

export const setTextFilter = (text = "") => ({
  type: SET_TEXT_FILTER,
  text
});

export const sortByAmount = () => ({
  type: SORT_BY_AMOUNT
});

export const sortByDate = () => ({
  type: SORT_BY_DATE
});

export const setStartDate = (startDate = null) => ({
  type: SET_START_DATE,
  startDate
});

export const setEndDate = (endDate = null) => ({
  type: SET_END_DATE,
  endDate
});
