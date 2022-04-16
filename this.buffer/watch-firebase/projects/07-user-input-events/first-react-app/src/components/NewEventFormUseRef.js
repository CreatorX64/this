import { useRef } from "react";
import "./NewEventForm.css";

const NewEventFormUseRef = ({ onEventAdd }) => {
  const titleInputRef = useRef();
  const dateInputRef = useRef();

  const resetForm = () => {
    titleInputRef.current.value = "";
    dateInputRef.current.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEvent = {
      id: `${Date.now()}${Math.floor(Math.random() * 10000)}`,
      title: titleInputRef.current.value,
      date: dateInputRef.current.value
    };

    onEventAdd(newEvent);
    resetForm();
  };

  return (
    <form className="new-event-form" onSubmit={handleSubmit}>
      <label>
        <span>Event Title</span>
        <input type="text" ref={titleInputRef} />
      </label>
      <label>
        <span>Event Date</span>
        <input type="date" ref={dateInputRef} />
      </label>
      <button>Submit</button>{" "}
      <button type="button" onClick={resetForm}>
        Reset Form
      </button>
    </form>
  );
};

export default NewEventFormUseRef;
