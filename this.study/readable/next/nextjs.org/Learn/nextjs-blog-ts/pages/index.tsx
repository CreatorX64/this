import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { getSortedPostsData } from "../lib/posts";
import Layout, { siteTitle } from "../components/layout";
import Date from "../components/date";
import utilStyles from "../styles/utils.module.css";

export const getStaticProps: GetStaticProps = () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData
    }
  };
};

export default function Home({
  allPostsData
}: {
  allPostsData: { id: string; title: string; date: string }[];
}): JSX.Element {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          Hi, I&apos;m <strong>Hakan</strong>. I&apos;m a web developer based in
          Istanbul. You can contact me on{" "}
          <a
            href="https://twitter.com/creatorX64"
            target="_blank"
            rel="noreferrer"
          >
            Twitter
          </a>
          .
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
  );
}
