import PostGrid from "../posts/PostGrid";
import classes from "./FeaturedPosts.module.css";

export default function FeaturedPosts(props) {
  const { posts } = props;

  return (
    <section className={classes.latest}>
      <h2>Featured Posts</h2>
      <PostGrid posts={posts} />
    </section>
  );
}
