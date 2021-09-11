import React from "react";
import { connect } from "react-redux";
import { setTextFilter, sortByDate, sortByAmount } from "../actions";

const ExpenseListFilters = ({
  filters,
  setTextFilter,
  sortByDate,
  sortByAmount
}) => (
  <div>
    <input
      type="text"
      value={filters.text}
      onChange={(e) => setTextFilter(e.target.value)}
    />
    <select
      value={filters.sortBy}
      onChange={(e) => {
        if (e.target.value === "date") {
          sortByDate();
        } else if (e.target.value === "amount") {
          sortByAmount();
        }
      }}
    >
      <option value="date">Date</option>
      <option value="amount">Amount</option>
    </select>
  </div>
);

const mapStateToProps = (state) => ({
  filters: state.filters
});

export const ConnectedExpenseListFilters = connect(mapStateToProps, {
  setTextFilter,
  sortByDate,
  sortByAmount
})(ExpenseListFilters);
