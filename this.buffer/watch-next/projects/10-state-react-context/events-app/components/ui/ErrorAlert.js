import classes from "./ErrorAlert.module.css";

export default function ErrorAlert(props) {
  return <div className={classes.alert}>{props.children}</div>;
}
