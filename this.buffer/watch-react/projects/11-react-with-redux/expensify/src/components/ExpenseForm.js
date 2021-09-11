import React from "react";
import { TextField } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

export class ExpenseForm extends React.Component {
  state = {
    description: "",
    note: "",
    amount: "",
    createdAt: new Date()
  };

  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  };

  onNoteChange = (e) => {
    const note = e.target.value;
    this.setState(() => ({ note }));
  };

  onAmountChange = (e) => {
    const amount = e.target.value;
    if (amount.match(/^\d*(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }));
    }
  };

  onDateChange = (createdAt) => {
    this.setState(() => ({ createdAt }));
  };

  render() {
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div>
          <form>
            <input
              type="text"
              placeholder="Description"
              value={this.state.description}
              onChange={this.onDescriptionChange}
              autoFocus
            />
            <input
              type="text"
              placeholder="Amount"
              value={this.state.amount}
              onChange={this.onAmountChange}
            />
            <DatePicker
              label="Created At"
              inputFormat="dd/MM/yyyy"
              value={this.state.createdAt}
              onChange={this.onDateChange}
              renderInput={(props) => <TextField {...props} />}
              showDaysOutsideCurrentMonth={false}
            />
            <textarea
              placeholder="Add a note for your expense (optional)"
              value={this.state.note}
              onChange={this.onNoteChange}
            />
            <button>Add Expense</button>
          </form>
        </div>
      </LocalizationProvider>
    );
  }
}
