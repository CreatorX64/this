import Head from "next/head";
import Layout from "../../components/layout";
import FormattedDate from "../../components/formatted-date";
import { getAllPostIds, getPostData } from "../../lib/posts";
import utilStyles from "../../styles/utils.module.css";
import type { GetStaticPaths, GetStaticProps } from "next";
import type { FC } from "react";
import type { Post } from "../../lib/posts";

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params!.id as string);

  return {
    props: {
      postData
    }
  };
};

interface Props {
  postData: Post;
}

const PostPage: FC<Props> = ({ postData }) => {
  return (
    <>
      <Head>
        <title>{postData.title}</title>
      </Head>

      <Layout>
        <article>
          <h1 className={utilStyles.headingXl}>{postData.title}</h1>
          <div className={utilStyles.lightText}>
            <FormattedDate dateString={postData.date} />
          </div>
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml! }} />
        </article>
      </Layout>
    </>
  );
};

export default PostPage;
