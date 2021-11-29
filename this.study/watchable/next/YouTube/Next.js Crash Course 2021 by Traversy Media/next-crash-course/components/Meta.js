import Head from "next/head";

export default function Meta({ title, keywords, description }) {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}

Meta.defaultProps = {
  title: "WebDev Newz",
  keywords: "web development, programming, tech news",
  description: "Get the latest news in web development."
};
