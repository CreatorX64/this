import React, { Component } from "react";
import { Form, Field } from "react-final-form";

export class StreamForm extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.renderInput = this.renderInput.bind(this);
  }

  onSubmit(formValues) {
    this.props.onSubmit(formValues);
  }

  renderInput({ input, label, meta }) {
    const className = `field ${meta.error && meta.touched && "error"}`;

    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} />
        {this.renderError(meta)}
      </div>
    );
  }

  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  validateForm(formValues) {
    const errors = {};

    if (!formValues.title) {
      errors.title = "You must enter a title";
    }

    if (!formValues.description) {
      errors.description = "You must enter a description";
    }

    return errors;
  }

  renderForm({ handleSubmit }) {
    return (
      <form onSubmit={handleSubmit} className="ui form error">
        <Field name="title" component={this.renderInput} label="Enter title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }

  render() {
    return (
      <Form
        initialValues={this.props.initialValues}
        onSubmit={this.onSubmit}
        validate={this.validateForm}
        className="ui form error"
        render={this.renderForm}
      />
    );
  }
}
