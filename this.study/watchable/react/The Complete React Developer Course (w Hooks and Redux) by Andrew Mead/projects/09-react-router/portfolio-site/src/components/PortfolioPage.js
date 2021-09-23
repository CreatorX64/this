import React from "react";
import { Link } from "react-router-dom";

export const PortfolioPage = () => (
  <div>
    <h2>My Work</h2>
    <p>Check out the following things I've done:</p>
    <Link to="/portfolio/1">Item One</Link>
    <Link to="/portfolio/2">Item Two</Link>
  </div>
);
