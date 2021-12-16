import MainNav from "./MainNav";
import classes from "./Layout.module.css";

export default function Layout(props) {
  return (
    <div>
      <MainNav />
      <main className={classes.main}>{props.children}</main>
    </div>
  );
}
