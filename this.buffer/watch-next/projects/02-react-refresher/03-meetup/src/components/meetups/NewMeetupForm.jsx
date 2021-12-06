import { useState } from "react";
import Card from "../ui/Card";
import classes from "./NewMeetupForm.module.css";

export default function NewMeetupForm(props) {
  const [formInputs, setFormInputs] = useState({
    title: "",
    image: "",
    address: "",
    description: ""
  });

  function submitHandler(event) {
    event.preventDefault();
    props.onAddMeetup(formInputs);
  }

  function handleChange(event) {
    setFormInputs((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="title">Meetup Title</label>
          <input
            type="text"
            name="title"
            id="title"
            onChange={handleChange}
            value={formInputs.title}
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="image">Meetup Image</label>
          <input
            type="url"
            name="image"
            id="image"
            onChange={handleChange}
            value={formInputs.image}
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="address">Meetup Address</label>
          <input
            type="text"
            name="address"
            id="address"
            onChange={handleChange}
            value={formInputs.address}
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="description">Meetup Description</label>
          <textarea
            id="description"
            name="description"
            rows="5"
            onChange={handleChange}
            value={formInputs.description}
            required
          />
        </div>
        <div className={classes.actions}>
          <button type="submit">Add Meetup</button>
        </div>
      </form>
    </Card>
  );
}
