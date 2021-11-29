import { Fragment } from "react";
import Meta from "./Meta";
import Nav from "./Nav";
import Header from "./Header";
import layoutStyles from "../styles/Layout.module.css";

export default function Layout({ children }) {
  return (
    <Fragment>
      <Meta />
      <Nav />
      <div className={layoutStyles.container}>
        <main className={layoutStyles.main}>
          <Header />
          {children}
        </main>
      </div>
    </Fragment>
  );
}
