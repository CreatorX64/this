import Head from "next/head";
import { getSession } from "next-auth/react";
import { Sidebar } from "../components/sidebar";
import { Center } from "../components/center";
import { Player } from "../components/player";

export async function getServerSideProps(context) {
  return {
    // Note that we don't return this "session" props to directly use it down in
    // our component. We return it so that SessionProvider (which wraps our page
    // component) can extract it and set the session on the server side. This
    // allows our <Center /> component to: Display the user's default playlist
    // on initial render, and prevent the flickering when the user's avatar &
    // username are loading at the top right of the screen.
    props: {
      session: await getSession(context)
    }
  };
}

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Spotify Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="h-screen overflow-hidden bg-black">
        <main className="flex">
          <Sidebar />
          <Center />
        </main>

        <div className="sticky bottom-0">
          <Player />
        </div>
      </div>
    </>
  );
}
