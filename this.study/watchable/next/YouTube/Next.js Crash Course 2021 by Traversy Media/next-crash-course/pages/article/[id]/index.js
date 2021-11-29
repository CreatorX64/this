import Link from "next/link";
// import { useRouter } from "next/router";
import Meta from "../../../components/Meta";
import { rootUrl } from "../../../config";

export default function Article({ article }) {
  // const router = useRouter();
  // const { id } = router.query;

  return (
    <article>
      {/* The Head inside this Meta component overrides the one we used in Layout */}
      <Meta title={article.title} description={article.excerpt} />

      <h1>{article.title}</h1>
      <p>{article.body}</p>
      <br />
      <Link href="/">Go back</Link>
    </article>
  );
}

//-- Fetch post data on each request, from an outside source.

// export async function getServerSideProps(context) {
//   const res = await fetch(
//     `https://jsonplaceholder.typicode.com/posts/${context.params.id}`
//   );
//   const article = await res.json();

//   return {
//     props: {
//       article
//     }
//   };
// }

//-- Fetch post data at build time (i.e. SSG), from an outside source.

// export async function getStaticProps(context) {
//   const res = await fetch(
//     `https://jsonplaceholder.typicode.com/posts/${context.params.id}`
//   );
//   const article = await res.json();

//   return {
//     props: {
//       article
//     }
//   };
// }

// export async function getStaticPaths() {
//   const res = await fetch("https://jsonplaceholder.typicode.com/posts");
//   const articles = await res.json();
//   const paths = articles.map((article) => ({
//     params: { id: article.id.toString() }
//   }));

//   return {
//     paths,
//     fallback: false
//   };
// }

//-- Fetch post data at build time, from our Next.js app's API.

export async function getStaticProps(context) {
  const res = await fetch(`${rootUrl}/api/articles/${context.params.id}`);
  const article = await res.json();

  return {
    props: {
      article
    }
  };
}

export async function getStaticPaths() {
  const res = await fetch(`${rootUrl}/api/articles`);
  const articles = await res.json();
  const paths = articles.map((article) => ({
    params: { id: article.id.toString() }
  }));

  return {
    paths,
    fallback: false
  };
}
