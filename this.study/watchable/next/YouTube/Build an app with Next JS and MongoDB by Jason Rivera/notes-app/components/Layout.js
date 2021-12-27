import Head from "next/head";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Notes App</title>
        <meta
          name="description"
          content="Keep track of your notes, organize your life."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      {children}
    </>
  );
}
