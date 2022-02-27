import { UserContextProvider } from "../context/user";
import { Nav } from "../components/nav";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <UserContextProvider>
      <Nav />
      <Component {...pageProps} />
    </UserContextProvider>
  );
}
