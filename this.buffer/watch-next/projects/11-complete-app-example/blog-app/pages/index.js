import { Fragment } from "react";
import Hero from "../components/home/Hero";
import FeaturedPosts from "../components/home/FeaturedPosts";

const dummyPosts = [
  {
    slug: "getting-started-with-nextjs",
    title: "Getting Started with NextJS",
    image: "getting-started-nextjs.png",
    excerpt:
      "NextJS is the React framework for production — it makes building fullstack React apps and sites a breeze and ships with built-in SSR.",
    date: "2022-02-10"
  },
  {
    slug: "getting-started-with-nextjs2",
    title: "Getting Started with NextJS",
    image: "getting-started-nextjs.png",
    excerpt:
      "NextJS is the React framework for production — it makes building fullstack React apps and sites a breeze and ships with built-in SSR.",
    date: "2022-02-10"
  },
  {
    slug: "getting-started-with-nextjs3",
    title: "Getting Started with NextJS",
    image: "getting-started-nextjs.png",
    excerpt:
      "NextJS is the React framework for production — it makes building fullstack React apps and sites a breeze and ships with built-in SSR.",
    date: "2022-02-10"
  },
  {
    slug: "getting-started-with-nextjs4",
    title: "Getting Started with NextJS",
    image: "getting-started-nextjs.png",
    excerpt:
      "NextJS is the React framework for production — it makes building fullstack React apps and sites a breeze and ships with built-in SSR.",
    date: "2022-02-10"
  }
];

export default function HomePage(props) {
  return (
    <Fragment>
      <Hero />
      <FeaturedPosts posts={dummyPosts} />
    </Fragment>
  );
}
