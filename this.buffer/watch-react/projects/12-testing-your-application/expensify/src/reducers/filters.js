import { DateTime } from "luxon";

export const filtersDefaults = {
  text: "",
  sortBy: "date", // "date" or "amount"
  startDate: DateTime.now().startOf("month"),
  endDate: DateTime.now().endOf("month")
};

export const filtersReducer = (state = filtersDefaults, action) => {
  switch (action.type) {
    case "SET_TEXT_FILTER":
      return { ...state, text: action.text };
    case "SORT_BY_AMOUNT":
      return { ...state, sortBy: "amount" };
    case "SORT_BY_DATE":
      return { ...state, sortBy: "date" };
    case "SET_START_DATE":
      return { ...state, startDate: action.startDate };
    case "SET_END_DATE":
      return { ...state, endDate: action.endDate };
    default:
      return state;
  }
};
