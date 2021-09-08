import React from "react";

export const Option = (props) => (
  <div>
    {props.optionText}
    <button onClick={() => props.handleDeleteOption(props.optionText)}>
      remove
    </button>
  </div>
);
