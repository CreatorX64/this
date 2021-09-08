import React from "react";

export const Option = (props) => (
  <div className="option">
    <p className="option__text">
      <span className="option__text__count">{props.count}.</span>{" "}
      {props.optionText}
    </p>
    <button
      className="button button--link"
      onClick={() => props.handleDeleteOption(props.optionText)}
    >
      remove
    </button>
  </div>
);
