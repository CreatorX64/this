import { Fragment } from "react";
import Head from "next/head";
import { getAllPosts } from "../../helpers/posts-utils";
import AllPosts from "../../components/posts/AllPosts";

export default function AllPostsPage(props) {
  return (
    <Fragment>
      <Head>
        <title>All Posts</title>
        <meta
          name="description"
          content="A list of all programming tutorials and posts."
        />
      </Head>
      <AllPosts posts={props.posts} />
    </Fragment>
  );
}

export function getStaticProps() {
  const posts = getAllPosts();
  return {
    props: {
      posts
    }
  };
}
