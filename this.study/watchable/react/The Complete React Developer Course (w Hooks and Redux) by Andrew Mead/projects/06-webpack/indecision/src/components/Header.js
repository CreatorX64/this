import React from "react";

export const Header = (props) => (
  <div>
    <h1>{props.title}</h1>
    {props.subTitle && <p>{props.subTitle}</p>}
  </div>
);

Header.defaultProps = {
  title: "Indecision"
};
