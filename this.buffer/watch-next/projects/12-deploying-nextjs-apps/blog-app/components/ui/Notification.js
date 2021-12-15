import ReactDOM from "react-dom";
import classes from "./Notification.module.css";

export default function Notification(props) {
  const { title, message, status } = props;
  let statusClass = "";

  if (status === "success") {
    statusClass = classes.success;
  } else if (status === "error") {
    statusClass = classes.error;
  }

  const cssClasses = `${classes.notification} ${statusClass}`;

  return ReactDOM.createPortal(
    <div className={cssClasses}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>,
    document.getElementById("notifications")
  );
}
