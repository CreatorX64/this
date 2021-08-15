import React, { useState } from "react";
import Field from "./components/field";
import Languages from "./components/languages";
import Translate from "./components/translate";
import "./styles.css";

const App = () => {
  const [language, setLanguage] = useState("ru");
  const [text, setText] = useState("");

  return (
    <div>
      <Field label="Enter English" value={text} onChange={setText} />
      <Languages language={language} onLanguageChange={setLanguage} />
      <hr />
      <Translate language={language} text={text} />
    </div>
  );
};

export default App;