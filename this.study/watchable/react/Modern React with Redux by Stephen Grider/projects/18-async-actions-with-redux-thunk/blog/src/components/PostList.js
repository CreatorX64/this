import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPosts } from "../actions";

// TODO: Turn this into a functional component after project ends

class PostList extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    return <div>Post List</div>;
  }
}

export const ConnectedPostList = connect(null, { fetchPosts })(PostList);
