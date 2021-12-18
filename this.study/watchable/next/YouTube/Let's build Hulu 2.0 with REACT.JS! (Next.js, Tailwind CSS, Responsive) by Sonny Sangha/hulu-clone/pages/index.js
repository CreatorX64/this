import Head from "next/head";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Results from "../components/Results";
import requests from "../utils/requests";

export async function getServerSideProps(context) {
  const { genre } = context.query;
  const res = await fetch(
    `https://api.themoviedb.org/3${
      requests[genre]?.url || requests.fetchTrending.url
    }`
  );
  const data = await res.json();

  return {
    props: {
      results: data.results
    }
  };
}

export default function Home({ results }) {
  return (
    <>
      <Head>
        <title>Hulu 2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Header />
        <Nav />
        <Results results={results} />
      </div>
    </>
  );
}
