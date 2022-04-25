import { useState, useCallback } from "react";

const ComponentWithRefRead = () => {
  const [text, setText] = useState("Some text...");

  const handleChange = (event) => {
    setText(event.target.value);
  };

  // Run on first render & whenever "text" changes
  // const ref = useRef();
  // useEffect(() => {
  //   const { width } = ref.current.getBoundingClientRect();
  //   document.title = `Width: ${width}`;
  // }, [text]);

  // Run on every render because a new "ref" function is created on each render
  // and passed in as a ref prop to the span below. When span receives new ref
  // prop, it'll call it if it's a callback ref. You can create a function with
  // useCallback to stop it from being re-created on each render, that way you
  // can control when the callback ref will be called.
  // const ref = (node) => {
  //   if (!node) return;
  //   const { width } = node.getBoundingClientRect();
  //   document.title = `Width: ${width}`;
  // };

  // Run on first render
  // const ref = useCallback((node) => {
  //   if (!node) return;
  //   const { width } = node.getBoundingClientRect();
  //   document.title = `Width: ${width}`;
  // }, []);

  // Run on first render & whenever "text" changes
  const ref = useCallback(
    (node) => {
      if (!node) return;
      const { width } = node.getBoundingClientRect();
      document.title = `Width: ${width}`;
    },
    [text]
  );

  return (
    <div>
      <input type="text" value={text} onChange={handleChange} />
      <div>
        <span ref={ref}>{text}</span>
      </div>
    </div>
  );
};

export default ComponentWithRefRead;
