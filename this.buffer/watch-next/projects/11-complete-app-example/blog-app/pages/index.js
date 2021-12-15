import { Fragment } from "react";
import { getFeaturedPosts } from "../helpers/posts-utils";
import Hero from "../components/home/Hero";
import FeaturedPosts from "../components/home/FeaturedPosts";

export default function HomePage(props) {
  return (
    <Fragment>
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
