import "../styles/globals.css";

export const reportWebVitals = (metric) => {
  console.log(metric);
};

const MyApp = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default MyApp;
