import Head from "next/head";
import { Feed } from "../components/Feed";
import { Header } from "../components/Header";
import { Modal } from "../components/Modal";

export default function Home() {
  return (
    <>
      <Head>
        <title>Instagram Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="h-screen overflow-y-scroll scrollbar-hide bg-gray-50">
        <Header />
        <Feed />
        <Modal />
      </div>
    </>
  );
}
