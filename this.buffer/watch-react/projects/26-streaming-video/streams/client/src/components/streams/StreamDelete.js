import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteStream, fetchStream } from "../../actions";
import { history } from "../../history";
import { Modal } from "../Modal";
import { TextPlaceholder } from "../TextPlaceholder";

class StreamDelete extends Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  renderActions() {
    const { id } = this.props.match.params;

    return (
      <Fragment>
        <button
          onClick={() => this.props.deleteStream(id)}
          className="ui button negative"
        >
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </Fragment>
    );
  }

  renderBody() {
    if (!this.props.stream) {
      return <TextPlaceholder lineCount={3} />;
    }

    return `Are you sure you want to delete the stream with title: ${this.props.stream.title}`;
  }

  render() {
    return (
      <Modal
        title="Delete Stream"
        body={this.renderBody()}
        actions={this.renderActions()}
        onDismiss={() => history.push("/")}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  stream: state.streams[ownProps.match.params.id]
});

export const ConnectedStreamDelete = connect(mapStateToProps, {
  deleteStream,
  fetchStream
})(StreamDelete);
