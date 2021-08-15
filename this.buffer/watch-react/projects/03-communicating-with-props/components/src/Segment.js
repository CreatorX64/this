import React from "react";

const Segment = (props) => {
  return (
    <div className="ui placeholder segment">
      {props.children}
    </div>
  );
};

export default Segment;