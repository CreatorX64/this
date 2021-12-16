import { useState } from "react";
import classes from "./ProfileForm.module.css";

export default function ProfileForm(props) {
  const [formData, setFormData] = useState({
    newPassword: "",
    oldPassword: ""
  });

  function handleChange(event) {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await props.onChangePassword(formData.oldPassword, formData.newPassword);
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="old-password">Old Password</label>
        <input
          type="password"
          id="old-password"
          name="oldPassword"
          value={formData.oldPassword}
          onChange={handleChange}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}
