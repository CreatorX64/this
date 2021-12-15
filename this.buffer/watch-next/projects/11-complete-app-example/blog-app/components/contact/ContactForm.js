import { useState, useEffect } from "react";
import Notification from "../ui/Notification";
import classes from "./ContactForm.module.css";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    message: ""
  });
  const [requestStatus, setRequestStatus] = useState();
  const [requestError, setRequestError] = useState();

  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError(null);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [requestStatus]);

  async function sendMessageHandler(event) {
    event.preventDefault();

    setRequestStatus("pending");

    try {
      await sendContactData(formData);
      setRequestStatus("success");
      setFormData({ email: "", name: "", message: "" });
    } catch (error) {
      setRequestError(error.message);
      setRequestStatus("error");
    }
  }

  function handleChange(event) {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  }

  let notificationData;

  if (requestStatus === "pending") {
    notificationData = {
      status: "pending",
      title: "Sending message...",
      message: "Your message is on its way!"
    };
  } else if (requestStatus === "success") {
    notificationData = {
      status: "success",
      title: "Success!",
      message: "Message sent successfully!"
    };
  } else if (requestStatus === "error") {
    notificationData = {
      status: "error",
      title: "Error!",
      message: requestError
    };
  }

  return (
    <section className={classes.contact} onSubmit={sendMessageHandler}>
      <h1>How can I help you?</h1>
      <form className={classes.form}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
          />
        </div>
        <div className={classes.actions}>
          <button>Send message</button>
        </div>
      </form>
      {notificationData && (
        <Notification
          status={notificationData.status}
          title={notificationData.title}
          message={notificationData.message}
        />
      )}
    </section>
  );
}

async function sendContactData(contactDetails) {
  const response = await fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(contactDetails),
    headers: {
      "Content-Type": "application/json"
    }
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }
}
