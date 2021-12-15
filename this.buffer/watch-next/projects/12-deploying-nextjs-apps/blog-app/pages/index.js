import { Fragment } from "react";
import Head from "next/head";
import { getFeaturedPosts } from "../helpers/posts-utils";
import Hero from "../components/home/Hero";
import FeaturedPosts from "../components/home/FeaturedPosts";

export default function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>Max&apos;s Blog</title>
        <meta
          name="description"
          content="I post about programming and web development."
        />
      </Head>
      <Hero />
      <FeaturedPosts posts={props.posts} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const posts = getFeaturedPosts();

  return {
    props: {
      posts
    }
  };
}
