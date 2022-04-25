import Head from "next/head";
import { getAllPostIds, getPostData } from "@/lib/posts";
import Date from "@/components/date";
import Layout from "@/components/layout";
import utilStyles from "@/styles/utils.module.css";

export const getStaticPaths = async () => {
  const paths = getAllPostIds();

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id);

  return {
    props: {
      postData
    }
  };
};

const PostPage = ({ postData }) => {
  return (
    <>
      <Head>
        <title>{postData.title}</title>
      </Head>

      <Layout>
        <article>
          <h1 className={utilStyles.headingXl}>{postData.title}</h1>
          <div className={utilStyles.lightText}>
            <Date dateString={postData.date} />
          </div>
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }}></div>
        </article>
      </Layout>
    </>
  );
};

export default PostPage;
