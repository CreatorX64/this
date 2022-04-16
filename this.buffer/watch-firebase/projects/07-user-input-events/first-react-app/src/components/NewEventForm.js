import { useState } from "react";
import "./NewEventForm.css";

const NewEventForm = ({ onEventAdd }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("manchester");

  const resetForm = () => {
    setTitle("");
    setDate("");
    setLocation("manchester");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEvent = {
      id: `${Date.now()}${Math.floor(Math.random() * 10000)}`,
      title,
      date,
      location
    };

    onEventAdd(newEvent);
    resetForm();
  };

  return (
    <form className="new-event-form" onSubmit={handleSubmit}>
      <label>
        <span>Event Title</span>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label>
        <span>Event Date</span>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>
      <label>
        <span>
          Evnet Location{" "}
          <select onChange={(e) => setLocation(e.target.value)}>
            <option value="manchester">Manchester</option>
            <option value="london">London</option>
            <option value="cardiff">Cardiff</option>
          </select>
        </span>
      </label>
      <button>Submit</button>{" "}
      <button type="button" onClick={resetForm}>
        Reset Form
      </button>
    </form>
  );
};

export default NewEventForm;
