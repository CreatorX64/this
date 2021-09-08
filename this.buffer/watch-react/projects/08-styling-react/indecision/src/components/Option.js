import React from "react";

export const Option = (props) => (
  <div>
    {props.optionText}
    <button
      className="button button--link"
      onClick={() => props.handleDeleteOption(props.optionText)}
    >
      remove
    </button>
  </div>
);
