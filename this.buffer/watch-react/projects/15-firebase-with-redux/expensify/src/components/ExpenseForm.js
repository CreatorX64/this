import React from "react";
import { TextField } from "@mui/material";
import { DatePicker } from "@mui/lab";
import { DateTime } from "luxon";

export class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);

    const { expense } = props;

    this.state = {
      description: expense ? expense.description : "",
      note: expense ? expense.note : "",
      amount: expense ? (expense.amount / 100).toString() : "",
      createdAt: expense ? expense.createdAt : DateTime.now(),
      error: ""
    };
  }

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
    if (!amount || amount.match(/^\d+(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }));
    }
  };

  onDateChange = (createdAt) => {
    if (createdAt) {
      this.setState(() => ({ createdAt }));
    }
  };

  onSubmit = (e) => {
    e.preventDefault();

    if (!this.state.description || !this.state.amount) {
      this.setState(() => ({
        error: "Please provide description and amount."
      }));
    } else {
      this.setState(() => ({ error: "" }));
      this.props.onSubmit({
        description: this.state.description,
        amount: Number(this.state.amount) * 100, // We're working with pennies
        createdAt: this.state.createdAt,
        note: this.state.note
      });
    }
  };

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.onSubmit}>
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
            inputProps={{ readOnly: true }}
          />
          <textarea
            placeholder="Add a note for your expense (optional)"
            value={this.state.note}
            onChange={this.onNoteChange}
          />
          <button>Add Expense</button>
        </form>
      </div>
    );
  }
}
