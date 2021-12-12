import { useContext } from "react";
import NotificationContext from "../../store/NotificationContext";
import classes from "./Notification.module.css";

export default function Notification(props) {
  const { title, message, status } = props;
  const context = useContext(NotificationContext);
  let statusClass = "";

  if (status === "success") {
    statusClass = classes.success;
  } else if (status === "error") {
    statusClass = classes.error;
  } else if (status === "pending") {
    statusClass = classes.pending;
  }

  const activeClasses = `${classes.notification} ${statusClass}`;

  return (
    <div className={activeClasses} onClick={context.hideNotification}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}
