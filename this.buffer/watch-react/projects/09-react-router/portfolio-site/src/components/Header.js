import React from "react";
import { NavLink } from "react-router-dom";

export const Header = () => (
  <header>
    <h1>Portfolio</h1>
    <NavLink to="/" activeClassName="nav-link--active" exact>
      Home
    </NavLink>
    <NavLink to="/portfolio" activeClassName="nav-link--active" exact>
      Portfolio
    </NavLink>
    <NavLink to="/contact" activeClassName="nav-link--active" exact>
      Contact
    </NavLink>
  </header>
);
