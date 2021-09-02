import React, { Component } from "react";
import { connect } from "react-redux";
import { createStream } from "../../actions";
import { StreamForm } from "./StreamForm";

class StreamCreate extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(formValues) {
    this.props.createStream(formValues);
  }

  render() {
    return (
      <div>
        <h3>Create a Stream</h3>
        <StreamForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export const ConnectedStreamCreate = connect(null, { createStream })(
  StreamCreate
);
