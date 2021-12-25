import { useState, useRef } from "react";
import styles from "./NewEventForm.module.css";

export default function NewEventForm({ addEvent }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("manchester");

  // const titleRef = useRef(null);
  // const dateRef = useRef(null);

  function resetForm() {
    setTitle("");
    setDate("");
    setLocation("manchester");

    // titleRef.current.value = "";
    // dateRef.current.value = "";
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    const event = {
      id: Math.floor(Math.random() * 10000),
      title,
      date,
      location
      // title: titleRef.current.value,
      // date: dateRef.current.value
    };
    console.log(event);

    addEvent(event);

    resetForm();
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>
        <span>Event title</span>
        <input
          // ref={titleRef}
          type="text"
          name="title"
          value={title}
          onChange={(evt) => setTitle(evt.target.value)}
        />
      </label>
      <label>
        <span>Event date</span>
        <input
          // ref={dateRef}
          type="date"
          name="date"
          value={date}
          onChange={(evt) => setDate(evt.target.value)}
        />
      </label>
      <label>
        <span>Event location</span>
        <select onChange={(evt) => setLocation(evt.target.value)}>
          <option value="manchester">Manchester</option>
          <option value="london">London</option>
          <option value="cardiff">Cardiff</option>
        </select>
      </label>
      <button>Submit</button>
    </form>
  );
}
