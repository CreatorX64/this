import { useState, useEffect } from "react";
import SanityBlockContent from "@sanity/block-content-to-react";
import imageUrlBuilder from "@sanity/image-url";
import Toolbar from "../../components/toolbar";
import styles from "../../styles/Post.module.css";

export const getServerSideProps = async (context) => {
  const slug = context.query.slug;

  if (!slug) {
    return {
      notFound: true
    };
  }

  const query = encodeURIComponent(
    `*[_type == "post" && slug.current == "${slug}"]`
  );
  const url = `https://fcudoatz.api.sanity.io/v1/data/query/production?query=${query}`;

  const result = await fetch(url).then((res) => res.json());
  const post = result.result[0];

  if (!post) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      title: post.title,
      body: post.body,
      image: post.mainImage
    }
  };
};

const Post = ({ title, body, image }) => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const imgBuilder = imageUrlBuilder({
      projectId: "fcudoatz",
      dataset: "production"
    });
    setImageUrl(imgBuilder.image(image));
  }, [image]);

  return (
    <div>
      <Toolbar />

      <div className={styles.main}>
        <h1>{title}</h1>

        {imageUrl && (
          <img src={imageUrl} className={styles.mainImage} alt={title} />
        )}

        <div className={styles.body}>
          <SanityBlockContent blocks={body} />
        </div>
      </div>
    </div>
  );
};

export default Post;
