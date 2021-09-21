import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { ConnectedHeader as Header } from "../components/Header";

export function PrivateRoute(props) {
  const { isAuthenticated, component: Component, ...rest } = props;

  return (
    <Route
      component={(props) =>
        isAuthenticated ? (
          <div>
            <Header />
            <Component {...props} />
          </div>
        ) : (
          <Redirect to="/" />
        )
      }
      {...rest}
    />
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.uid
  };
}

export const ConnectedPrivateRoute = connect(mapStateToProps)(PrivateRoute);
