import React from "react";

export const PortfolioItemPage = (props) => (
  <div>
    <h2>A Think I've Done</h2>
    <p>This page if for the item with id of {props.match.params.id}</p>
  </div>
);
