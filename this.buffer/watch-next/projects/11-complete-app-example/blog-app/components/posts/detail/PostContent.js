import classes from "./PostContent.module.css";
import PostHeader from "./PostHeader";

const dummyPost = {
  slug: "getting-started-with-nextjs",
  title: "Getting Started with NextJS",
  image: "getting-started-nextjs.png",
  date: "2022-02-10",
  content: "# This is a first post"
};

export default function PostContent(props) {
  const imagePath = `/images/posts/${dummyPost.slug}/${dummyPost.image}`;

  return (
    <article className={classes.content}>
      <PostHeader title={dummyPost.title} image={imagePath} />
      {dummyPost.content}
    </article>
  );
}
