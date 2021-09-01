import React from "react";
import { v4 as uuidv4 } from "uuid";

export const TextPlaceholder = ({ lineCount }) => {
  return <div>{renderLines(lineCount)}</div>;
};

const renderLines = (lineCount) => {
  const lines = [];

  for (let i = 0; i < lineCount; i++) {
    lines.push(
      <div
        key={uuidv4()}
        style={{
          backgroundColor: "#eee",
          width: "100%",
          height: "16px",
          marginBottom: "5px"
        }}
      ></div>
    );
  }

  return lines;
};
