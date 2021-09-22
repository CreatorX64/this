import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

export function PublicRoute(props) {
  const { isAuthenticated, component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      component={(props) =>
        isAuthenticated ? (
          <Redirect to="/dashboard" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.uid
  };
}

export const ConnectedPublicRoute = connect(mapStateToProps)(PublicRoute);
