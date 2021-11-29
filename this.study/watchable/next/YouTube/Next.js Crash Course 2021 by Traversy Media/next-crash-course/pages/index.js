import ArticleList from "../components/ArticleList";
import { rootUrl } from "../config";

export default function Home({ articles }) {
  return (
    <div>
      <ArticleList articles={articles} />
    </div>
  );
}

// Fetching data from a remote resource.

// export async function getStaticProps() {
//   const res = await fetch("https://jsonplaceholder.typicode.com/posts");
//   const articles = await res.json();

//   return {
//     props: {
//       articles
//     }
//   };
// }

// Fetching data from our Next.js app API.

export async function getStaticProps() {
  const res = await fetch(`${rootUrl}/api/articles`);
  const articles = await res.json();

  return {
    props: {
      articles
    }
  };
}
