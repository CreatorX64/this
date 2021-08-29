import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { createStream } from "../../actions";

class StreamCreate extends React.Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.renderInput = this.renderInput.bind(this);
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

  renderInput({ input, label, meta }) {
    const className = `field ${meta.error && meta.touched && "error"}`;

    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  }

  onSubmit(formValues) {
    this.props.createStream(formValues);
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

const validate = (formValues) => {
  const errors = {};

  if (!formValues.title) {
    errors.title = "You must enter a title";
  }

  if (!formValues.description) {
    errors.description = "You must enter a description";
  }

  return errors;
};

export const ConnectedStreamCreate = connect(null, { createStream })(
  reduxForm({
    form: "streamCreate",
    validate
  })(StreamCreate)
);
