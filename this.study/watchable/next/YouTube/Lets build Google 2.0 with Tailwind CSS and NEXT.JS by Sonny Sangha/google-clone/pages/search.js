import Head from "next/head";
import { useRouter } from "next/router";
import Header from "../components/Header";
import SearchResults from "../components/SearchResults";
import dummyResponse from "../dummy/response.json";

export async function getServerSideProps(context) {
  const useDummyData = false;
  const { term, start = "0" } = context.query;

  const data = useDummyData
    ? dummyResponse
    : await fetch(
        `https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_API_KEY}&cx=${process.env.GOOGLE_CONTEXT_KEY}&q=${term}&start=${start}`
      ).then((res) => res.json());

  return {
    props: {
      results: data
    }
  };
}

export default function Search({ results }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{router.query.term} - Google Search</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <SearchResults results={results} />
    </>
  );
}
