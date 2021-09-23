import React from "react";

export const EditExpensePage = (props) => {
  console.log(props);
  return (
    <div>
      <p>Editing the expense with id of {props.match.params.id}</p>
    </div>
  );
};
