import React from "react";
import { connect } from "react-redux";
import { startLogin } from "../actions/auth";

export function LoginPage({ startLogin }) {
  return (
    <div>
      <button onClick={startLogin}>Login</button>
    </div>
  );
}

const mapDispatchToProps = {
  startLogin
};

export const ConnectedLoginPage = connect(null, mapDispatchToProps)(LoginPage);
