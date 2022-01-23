import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import imageUrlBuilder from "@sanity/image-url";
import Toolbar from "../components/toolbar";
import styles from "../styles/Home.module.css";

export const getServerSideProps = async (context) => {
  const query = encodeURIComponent('*[_type == "post"]');
  const url = `https://fcudoatz.api.sanity.io/v1/data/query/production?query=${query}`;
  const result = await fetch(url).then((res) => res.json());

  if (!result.result || result.result.length === 0) {
    return {
      props: {
        posts: []
      }
    };
  }

  return {
    props: {
      posts: result.result
    }
  };
};

const Home = ({ posts }) => {
  const [mappedPosts, setMappedPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (posts.length > 0) {
      const imgBuilder = imageUrlBuilder({
        projectId: "fcudoatz",
        dataset: "production"
      });
      setMappedPosts(
        posts.map((post) => ({
          ...post,
          mainImage: imgBuilder.image(post.mainImage).width(500).height(250)
        }))
      );
    } else {
      setMappedPosts([]);
    }
  }, [posts]);

  return (
    <div>
      <Toolbar />

      <div className={styles.main}>
        <h1>Welcome to My Blog</h1>

        <h2>Recent Posts</h2>

        <div className={styles.feed}>
          {mappedPosts.length > 0 ? (
            mappedPosts.map((post, index) => (
              <div
                key={index}
                className={styles.post}
                onClick={() => router.push(`/post/${post.slug.current}`)}
              >
                <h3>{post.title}</h3>
                <img
                  className={styles.mainImage}
                  src={post.mainImage}
                  alt={post.title}
                />
              </div>
            ))
          ) : (
            <>No posts yet.</>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
