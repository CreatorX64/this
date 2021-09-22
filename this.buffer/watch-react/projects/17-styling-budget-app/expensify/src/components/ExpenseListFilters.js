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
} from "../actions/filters";

export class ExpenseListFilters extends React.Component {
  constructor(props) {
    super(props);

    this.onRangePickerValueChange = this.onRangePickerValueChange.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.onSortChange = this.onSortChange.bind(this);

    this.state = {
      rangePickerValue: [props.filters.startDate, props.filters.endDate]
    };
  }

  onRangePickerValueChange(newValue) {
    this.setState(() => ({ rangePickerValue: newValue }));

    const [startDate, endDate] = newValue;

    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  }

  onTextChange(e) {
    this.props.setTextFilter(e.target.value);
  }

  onSortChange(e) {
    if (e.target.value === "date") {
      this.props.sortByDate();
    } else if (e.target.value === "amount") {
      this.props.sortByAmount();
    }
  }

  render() {
    return (
      <div className="content-container">
        <div className="input-group">
          <div className="input-group__item">
            <input
              type="text"
              className="text-input"
              placeholder="Search expenses"
              value={this.props.filters.text}
              onChange={this.onTextChange}
            />
          </div>
          <div className="input-group__item">
            <select
              className="select"
              value={this.props.filters.sortBy}
              onChange={this.onSortChange}
            >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
            </select>
          </div>
          <div className="input-group__item">
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
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    filters: state.filters
  };
}

const mapDispatchToProps = {
  setTextFilter,
  sortByDate,
  sortByAmount,
  setStartDate,
  setEndDate
};

export const ConnectedExpenseListFilters = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpenseListFilters);
