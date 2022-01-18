import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta
            name="description"
            content="MERN stack developer looking for a job"
          />
          <meta
            name="keywords"
            content="Full Stack Web Developer, Freelancer, MERN developer"
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Kaushan+Script&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body className="text-[#354358] bg-gradient-to-r from-green to-blue-400 dark:text-white dark:from-dark-500 dark:to-dark-700">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
