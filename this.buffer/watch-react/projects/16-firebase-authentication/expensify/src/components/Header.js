import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { startLogout } from "../actions/auth";

export function Header({ startLogout }) {
  return (
    <header>
      <h1>Expensify</h1>
      <NavLink to="/" activeClassName="is-active" exact>
        Dashboard
      </NavLink>
      <NavLink to="/create" activeClassName="is-active" exact>
        Create Expense
      </NavLink>
      <button onClick={startLogout}>Logout</button>
    </header>
  );
}

const mapDispatchToProps = {
  startLogout
};

export const ConnectedHeader = connect(null, mapDispatchToProps)(Header);
