import React, { useState } from "react";
import Convert from "./Convert";
import Dropdown from "./Dropdown";

const options =
[
  {
    label: "Afrikaans",
    value: "af"
  },
  {
    label: "Arabic",
    value: "ar"
  },
  {
    label: "Dutch",
    value: "nl"
  },
  {
    label: "Hindi",
    value: "hi"
  },
  {
    label: "Turkish",
    value: "tr"
  }
];

const Translate = () =>
{
  const [language, setLanguage] = useState(options[0]);
  const [text, setText] = useState("");

  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label htmlFor="text">Enter Text</label>
          <input
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            />
        </div>
      </div>
      <Dropdown
        label="Select a Langauge"
        options={options}
        selected={language}
        onSelectedChange={setLanguage}
      />
      <hr />
      <h3 className="ui header">Output</h3>
      <Convert language={language} text={text} />
    </div>
  );
};

export default Translate;