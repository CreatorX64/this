import type { FC } from "react";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import Layout from "../components/layout";

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
