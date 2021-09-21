import {
  SET_TEXT_FILTER,
  SORT_BY_AMOUNT,
  SORT_BY_DATE,
  SET_START_DATE,
  SET_END_DATE
} from "./types";

export function setTextFilter(text = "") {
  return {
    type: SET_TEXT_FILTER,
    text
  };
}

export function sortByAmount() {
  return {
    type: SORT_BY_AMOUNT
  };
}

export function sortByDate() {
  return {
    type: SORT_BY_DATE
  };
}

export function setStartDate(startDate = null) {
  return {
    type: SET_START_DATE,
    startDate
  };
}

export function setEndDate(endDate = null) {
  return {
    type: SET_END_DATE,
    endDate
  };
}
