import { DateTime } from "luxon";

export const filters = {
  text: "",
  sortBy: "date",
  startDate: null,
  endDate: null
};

export const altFilters = {
  text: "bills",
  sortBy: "amount",
  startDate: DateTime.fromMillis(0),
  endDate: DateTime.fromMillis(0).plus({ days: 3 })
};
