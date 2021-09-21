import { shallow } from "enzyme";
import { beforeEach, expect, jest, test } from "@jest/globals";
import { DateTime } from "luxon";
import { DateRangePicker } from "@mui/lab";
import React from "react";
import { ExpenseListFilters } from "../../components/ExpenseListFilters";
import { filters, altFilters } from "../fixtures/filters";

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
  setTextFilter = jest.fn();
  sortByDate = jest.fn();
  sortByAmount = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();
  wrapper = shallow(
    <ExpenseListFilters
      filters={filters}
      setTextFilter={setTextFilter}
      sortByDate={sortByDate}
      sortByAmount={sortByAmount}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
    />
  );
});

test("should render ExpenseListFilters", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should render ExpenseListFilters with alt filters", () => {
  wrapper.setProps({ filters: altFilters });
  wrapper.setState({
    rangePickerValue: [altFilters.startDate, altFilters.endDate]
  });
  expect(wrapper).toMatchSnapshot();
});

test("should handle text change", () => {
  const value = "rent";
  wrapper.find("input").simulate("change", { target: { value } });
  expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test("should sort by date", () => {
  const value = "date";
  wrapper.setProps({ filters: altFilters });
  wrapper.find("select").simulate("change", { target: { value } });
  expect(sortByDate).toHaveBeenCalled();
});

test("should sort by amount", () => {
  const value = "amount";
  wrapper.find("select").simulate("change", { target: { value } });
  expect(sortByAmount).toHaveBeenCalled();
});

test("should handle date changes", () => {
  const startDate = DateTime.fromMillis(0).plus({ years: 4 });
  const endDate = DateTime.fromMillis(0).plus({ years: 8 });
  wrapper.find(DateRangePicker).simulate("change", [startDate, endDate]);
  expect(setStartDate).toHaveBeenLastCalledWith(startDate);
  expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});
