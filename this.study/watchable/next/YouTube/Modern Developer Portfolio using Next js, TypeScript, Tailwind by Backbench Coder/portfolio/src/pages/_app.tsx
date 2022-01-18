import { AnimatePresence } from "framer-motion";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import type { FC } from "react";
import "../styles/globals.css";
import Layout from "../components/layout";

const MyApp: FC<AppProps> = ({ Component, pageProps, router }) => {
  return (
    <ThemeProvider attribute="class">
      <Layout>
        <AnimatePresence exitBeforeEnter>
          {/* "key" prop is for the AnimatePresence component from framer-motion.*/}
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>
      </Layout>
    </ThemeProvider>
  );
};

export default MyApp;
