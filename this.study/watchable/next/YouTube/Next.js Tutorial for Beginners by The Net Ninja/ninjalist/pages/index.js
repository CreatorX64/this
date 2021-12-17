import Head from "next/head";
import Link from "next/link";
import { Fragment } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <Fragment>
      <Head>
        <title>NinjaList | Home</title>
        <meta name="keywords" content="ninjas" />
      </Head>
      <div>
        <h1 className={styles.title}>Homepage</h1>
        <p className={styles.text}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, optio
          nostrum maiores dignissimos porro debitis laborum facilis. Impedit,
          repellat perferendis quasi laborum necessitatibus dolore voluptate
          veritatis, quos nihil facere qui!
        </p>
        <p className={styles.text}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, optio
          nostrum maiores dignissimos porro debitis laborum facilis. Impedit,
          repellat perferendis quasi laborum necessitatibus dolore voluptate
          veritatis, quos nihil facere qui!
        </p>
        <Link href="/ninjas">
          <a className={styles.btn}>See Ninja Listing</a>
        </Link>
      </div>
    </Fragment>
  );
}
