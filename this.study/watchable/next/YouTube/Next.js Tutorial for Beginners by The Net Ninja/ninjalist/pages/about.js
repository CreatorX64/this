import Head from "next/head";
import { Fragment } from "react";

export default function About() {
  return (
    <Fragment>
      <Head>
        <title>NinjaList | About</title>
        <meta name="keywords" content="ninjas" />
      </Head>
      <div>
        <h1>About</h1>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae,
          esse iste! Doloribus blanditiis provident architecto aspernatur saepe
          rem obcaecati earum. Id, distinctio dolorem! Perferendis, perspiciatis
          ipsam cum voluptas expedita ducimus!
        </p>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae,
          esse iste! Doloribus blanditiis provident architecto aspernatur saepe
          rem obcaecati earum. Id, distinctio dolorem! Perferendis, perspiciatis
          ipsam cum voluptas expedita ducimus!
        </p>
      </div>
    </Fragment>
  );
}
