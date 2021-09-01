import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

class StreamForm extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
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

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
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
}

const validateForm = (formValues) => {
  const errors = {};

  if (!formValues.title) {
    errors.title = "You must enter a title";
  }

  if (!formValues.description) {
    errors.description = "You must enter a description";
  }

  return errors;
};

export const ConnectedStreamForm = reduxForm({
  form: "streamForm",
  validate: validateForm
})(StreamForm);
