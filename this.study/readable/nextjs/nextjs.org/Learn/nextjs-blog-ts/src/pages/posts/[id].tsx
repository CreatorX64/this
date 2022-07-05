import type { GetStaticProps, GetStaticPaths } from "next";
import type { FC } from "react";
import Head from "next/head";
// import Script from "next/script";

import type { Post } from "../../lib/posts";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Layout from "../../components/layout";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";

export const getStaticPaths: GetStaticPaths = () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id as string);
  return {
    props: {
      postData
    }
  };
};

interface PostProps {
  postData: Post;
}

const Post: FC<PostProps> = ({ postData }) => {
  return (
    <>
      <Head>
        <title>{postData.title}</title>
      </Head>

      {/* Adding third party scripts to a Next.js page. "lazyOnload" tells Next.js
      to load this particular script lazily during browser idle time */}
      {/* <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="lazyOnload"
        onLoad={() =>
          console.log("script loaded correctly, window.FB has been populated")
        }
      /> */}

      <Layout>
        <article>
          <h1 className={utilStyles.headingXl}>{postData.title}</h1>
          <div className={utilStyles.lightText}>
            <Date dateString={postData.date} />
          </div>
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
      </Layout>
    </>
  );
};

export default Post;
