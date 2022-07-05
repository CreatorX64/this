import Head from "next/head";
import Link from "next/link";

import { getSortedPostsData } from "../lib/posts";
import Layout, { siteTitle } from "../components/layout";
import Date from "../components/date";
import utilStyles from "../styles/utils.module.css";

export const getStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData
    }
  };
};

const Home = ({ allPostsData }) => {
  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <Layout isHome>
        <section className={utilStyles.headingMd}>
          <p>
            Hi 👋 I&apos;m Hakan, a web developer from Istanbul. I create
            websites using HTML, CSS, JavaScript, React, Next.js, Tailwind CSS,
            Firebase, and more 🚀
          </p>
          <p>
            (This is a sample website - you’ll be building a site like this on{" "}
            <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
          </p>
        </section>

        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <h2 className={utilStyles.headingLg}>Blog</h2>
          <ul className={utilStyles.list}>
            {allPostsData.map(({ id, date, title }) => (
              <li key={id} className={utilStyles.listItem}>
                <Link href={`/posts/${id}`}>
                  <a>{title}</a>
                </Link>
                <br />
                <small className={utilStyles.lightText}>
                  <Date dateString={date} />
                </small>
              </li>
            ))}
          </ul>
        </section>
      </Layout>
    </>
  );
};

export default Home;
