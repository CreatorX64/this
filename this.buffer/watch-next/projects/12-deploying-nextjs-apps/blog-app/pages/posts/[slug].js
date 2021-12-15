import { Fragment } from "react";
import Head from "next/head";
import { getPostData, getPostFilenames } from "../../helpers/posts-utils";
import PostContent from "../../components/posts/detail/PostContent";

export default function PostPage(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.post.title}</title>
        <meta name="description" content={props.post.excerpt} />
      </Head>
      <PostContent post={props.post} />
    </Fragment>
  );
}

export function getStaticProps(context) {
  const { slug } = context.params;
  const post = getPostData(slug);

  return {
    props: {
      post
    },
    revalidate: 600
  };
}

export function getStaticPaths() {
  const postFilenames = getPostFilenames();
  const slugs = postFilenames.map((filename) => filename.replace(/\.md$/, ""));
  const paths = slugs.map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false
  };
}
