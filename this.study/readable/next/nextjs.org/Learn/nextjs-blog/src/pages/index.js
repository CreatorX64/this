import Head from "next/head";
import Link from "next/link";
import Layout, { siteTitle } from "../components/layout";
import FormattedDate from "../components/formatted-date";
import { getSortedPostsData } from "../lib/posts";
import utilStyles from "../styles/utils.module.css";

export const getStaticProps = () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData
    }
  };
};

const HomePage = ({ allPostsData }) => {
  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <Layout home>
        <section className={utilStyles.headingMd}>
          <p>
            Hi, I'm <b>Hakan</b>. I create beautiful & fast web experiences
            using industry proven web technologies. Contact me on{" "}
            <a href="https://www.twitter.com/creatorX64">Twitter</a>.
          </p>
          <p>
            This is a sample website - you’ll be building a site like this on{" "}
            <a href="https://nextjs.org/learn">our Next.js tutorial</a>.
          </p>
        </section>

        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <h2 className={utilStyles.headingLg}>Blog</h2>
          <ul className={utilStyles.list}>
            {allPostsData.map(({ id, date, title }) => (
              <li className={utilStyles.listItem} key={id}>
                <Link href={`/posts/${id}`}>
                  <a>{title}</a>
                </Link>
                <br />
                <small className={utilStyles.lightText}>
                  <FormattedDate dateString={date} />
                </small>
              </li>
            ))}
          </ul>
        </section>
      </Layout>
    </>
  );
};

export default HomePage;
