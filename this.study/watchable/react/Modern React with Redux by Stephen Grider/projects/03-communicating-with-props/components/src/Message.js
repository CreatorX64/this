import React from "react";

export const Message = (props) => {
  return (
    <div className="ui message">
      <div className="header">{props.header}</div>
      <p>{props.text}</p>
    </div>
  );
};
