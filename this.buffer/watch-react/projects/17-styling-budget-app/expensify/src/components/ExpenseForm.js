import React from "react";
import { TextField } from "@mui/material";
import { DatePicker } from "@mui/lab";
import { DateTime } from "luxon";

export class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);

    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onNoteChange = this.onNoteChange.bind(this);
    this.onAmountChange = this.onAmountChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    const { expense } = props;

    this.state = {
      description: expense ? expense.description : "",
      note: expense ? expense.note : "",
      amount: expense ? (expense.amount / 100).toString() : "",
      createdAt: expense
        ? DateTime.fromMillis(expense.createdAt)
        : DateTime.now(),
      error: ""
    };
  }

  onDescriptionChange(e) {
    const description = e.target.value;
    this.setState(() => ({ description }));
  }

  onNoteChange(e) {
    const note = e.target.value;
    this.setState(() => ({ note }));
  }

  onAmountChange(e) {
    const amount = e.target.value;
    if (!amount || amount.match(/^\d+(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }));
    }
  }

  onDateChange(createdAt) {
    if (createdAt) {
      this.setState(() => ({ createdAt }));
    }
  }

  onSubmit(e) {
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
        createdAt: this.state.createdAt.toMillis(),
        note: this.state.note
      });
    }
  }

  render() {
    return (
      <form className="form" onSubmit={this.onSubmit}>
        {this.state.error && <p className="form__error">{this.state.error}</p>}
        <input
          type="text"
          className="text-input"
          placeholder="Description"
          value={this.state.description}
          onChange={this.onDescriptionChange}
          autoFocus
        />
        <input
          type="text"
          className="text-input"
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
          className="textarea"
          placeholder="Add a note for your expense (optional)"
          value={this.state.note}
          onChange={this.onNoteChange}
        />
        <div>
          <button className="button">Save Expense</button>
        </div>
      </form>
    );
  }
}
