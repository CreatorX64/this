import React, { useState, useEffect, useRef } from "react";

const Dropdown = ({ label, options, selected, onSelectedChange }) =>
{
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  useEffect(() =>
  {
    const onBodyClick = (event) =>
    {
      if (ref.current.contains(event.target))
      {
        return;
      }

      setIsOpen(false);
    };

    // If an event occurs like a navigation link's click event for instance,
    // the clean up function defined in the useEffect function will be run after
    // all the event handlers are exectued (starting from the clicked element's
    // event handler all the way to the top element's event handler). Because of
    // that behavior, if the first element's click handler removes this component
    // from the hierarchy, then when the body's click handler runs, we will get
    // an error becuase this element wouldn't exist, becuase the cleanup function
    // wouldn't have run yet. But if we add { capture: true }, we're effectively
    // running the body's click handler first, and then running all other handlers
    // from bottom to top. This way, even if this component is removed by a
    // navigation item link for instance, we won't have a problem and our useEffect
    // cleanup will still run at the end because the body's handler has ran first
    // before the component was removed.
    document.body.addEventListener("click", onBodyClick, { capture: true });

    return () =>
    {
      document.body.removeEventListener("click", onBodyClick, { capture: true });
    };
  }, []);

  const renderedOptions = options.map((option) =>
  {
    if (option.value === selected.value)
    {
      return null;
    }
    
    return (
      <div
        key={option.value}
        className="item"
        onClick={() => onSelectedChange(option)}
      >
        {option.label}
      </div>
    );
  });

  return (
    <div ref={ref} className="ui form">
      <div className="field">
        <label className="label">{label}</label>
        <div
          className={`ui selection dropdown ${isOpen ? "visible active" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <i className="dropdown icon"></i>
          <div className="text">{selected.label}</div>
          <div className={`menu ${isOpen ? "visible transition" : ""}`}>
            {renderedOptions}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;