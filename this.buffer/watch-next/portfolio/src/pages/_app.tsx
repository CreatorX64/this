import type { FC } from "react";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import "../styles/globals.css";
import Layout from "../components/layout";

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider attribute="class">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};

export default MyApp;
