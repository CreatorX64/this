import Head from "next/head";
import Link from "next/link";
import Logo from "./Logo";

export default function Layout({ children, title = "Crypto Tracker" }) {
  return (
    <div className="layout">
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="header">
        <Link href="/">
          <a>
            <Logo />
          </a>
        </Link>
      </header>

      <main>{children}</main>
    </div>
  );
}
