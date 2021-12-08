import { useState } from "react";

export default function HomePage() {
  const [formData, setFormData] = useState({ email: "", message: "" });
  const [feedbacks, setFeedbacks] = useState([]);

  function handleChange(event) {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const reqBody = { email: formData.email, message: formData.message };

    fetch("/api/feedbacks", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => console.log(data));

    setFormData({ email: "", message: "" });
  }

  function handleLoadFeedback() {
    fetch("/api/feedbacks")
      .then((res) => res.json())
      .then((data) => {
        setFeedbacks(data.feedbacks);
      });
  }

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Your email adress</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="message">Your message</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
          />
        </div>
        <button>Send feedback</button>
      </form>
      <hr />
      <button onClick={handleLoadFeedback}>Load feedbacks</button>
      <ul>
        {feedbacks.map((item) => (
          <li key={item.id}>{item.message}</li>
        ))}
      </ul>
    </div>
  );
}
