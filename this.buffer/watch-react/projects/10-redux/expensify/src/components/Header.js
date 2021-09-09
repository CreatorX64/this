import React from "react";
import { NavLink } from "react-router-dom";

export const Header = () => (
  <header>
    <h1>Expensify</h1>
    <NavLink to="/" activeClassName="is-active" exact>
      Dashboard
    </NavLink>
    <NavLink to="/create" activeClassName="is-active" exact>
      Create Expense
    </NavLink>
    <NavLink to="/help" activeClassName="is-active" exact>
      Help
    </NavLink>
  </header>
);
