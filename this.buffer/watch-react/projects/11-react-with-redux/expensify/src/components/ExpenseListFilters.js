import React from "react";
import { connect } from "react-redux";
import Button from "@mui/material/Button";
import { DateRangePicker } from "@mui/lab";
import { TextField, Box } from "@mui/material";
import {
  setTextFilter,
  sortByDate,
  sortByAmount,
  setStartDate,
  setEndDate
} from "../actions";

class ExpenseListFilters extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rangePickerValue: [props.filters.startDate, props.filters.endDate]
    };
  }

  onRangePickerValueChange = (newValue) => {
    this.setState(() => ({ rangePickerValue: newValue }));

    const [startDate, endDate] = newValue;
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  };

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.props.filters.text}
          onChange={(e) => this.props.setTextFilter(e.target.value)}
        />
        <select
          value={this.props.filters.sortBy}
          onChange={(e) => {
            if (e.target.value === "date") {
              this.props.sortByDate();
            } else if (e.target.value === "amount") {
              this.props.sortByAmount();
            }
          }}
        >
          <option value="date">Date</option>
          <option value="amount">Amount</option>
        </select>
        <DateRangePicker
          startText="Start date"
          endText="End date"
          inputFormat="dd/MM/yyyy"
          value={this.state.rangePickerValue}
          onChange={this.onRangePickerValueChange}
          calendars={1}
          clearable={true}
          renderInput={(startProps, endProps) => (
            <React.Fragment>
              <TextField {...startProps} />
              <Box sx={{ mx: 2 }}> to </Box>
              <TextField {...endProps} />
              <Button
                onClick={() => this.onRangePickerValueChange([null, null])}
              >
                Clear
              </Button>
            </React.Fragment>
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  filters: state.filters
});

export const ConnectedExpenseListFilters = connect(mapStateToProps, {
  setTextFilter,
  sortByDate,
  sortByAmount,
  setStartDate,
  setEndDate
})(ExpenseListFilters);
