import { useState, useContext } from "react";
import NotificationContext from "../../store/NotificationContext";
import classes from "./NewsletterRegistration.module.css";

export default function NewsletterRegistration() {
  const ctx = useContext(NotificationContext);
  const [email, setEmail] = useState("");

  function registrationHandler(event) {
    event.preventDefault();

    ctx.showNotification({
      title: "Signing up...",
      message: "Registering for newsletter",
      status: "pending"
    });

    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        // There was an error returned from the server
        return res.json().then((data) => {
          throw new Error(data.message || "Something went wrong!");
        });
      })
      .then((data) => {
        ctx.showNotification({
          title: "Success!",
          message: "Successfully registered for newsletter!",
          status: "success"
        });
      })
      .catch((error) => {
        ctx.showNotification({
          title: "Error!",
          message: error.message || "Something went wrong!",
          status: "error"
        });
      });
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}
