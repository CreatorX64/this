import { Fragment, useContext } from "react";
import NotificationContext from "../../store/NotificationContext";
import MainHeader from "./MainHeader";
import Notification from "../ui/Notification";

export default function Layout(props) {
  const context = useContext(NotificationContext);
  const activeNotification = context.notification;

  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </Fragment>
  );
}
