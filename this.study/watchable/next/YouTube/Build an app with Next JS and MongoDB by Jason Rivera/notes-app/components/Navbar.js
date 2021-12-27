import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link href="/">
        <a className="navbar-brand">Note App</a>
      </Link>
      <Link href="/new">
        <a className="create">Create note</a>
      </Link>
    </nav>
  );
}
