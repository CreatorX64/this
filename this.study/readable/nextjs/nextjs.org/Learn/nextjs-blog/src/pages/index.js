import Head from "next/head";
import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";
import Date from "@/components/date";
import Layout, { siteTitle } from "@/components/layout";
import utilStyles from "@/styles/utils.module.css";

export const getStaticProps = async () => {
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
            Hi 👋 I&apos;m Hakan, a frontend developer from Istanbul. I create
            websites using HTML, CSS, JavaScript, React, Next.js, Tailwind CSS,
            Firebase, and more 🚀
          </p>
          <p>
            This is a sample website — you&apos;ll be building a site like this
            on <a href="https://nextjs.org/learn">our Next.js tutorial</a>.
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

export default HomePage;
