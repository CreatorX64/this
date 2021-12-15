import { Fragment } from "react";
import MainNavigation from "./MainNavigation";

export default function Layout(props) {
  return (
    <Fragment>
      <MainNavigation />
      <main>{props.children}</main>
    </Fragment>
  );
}
