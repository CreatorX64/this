import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [router]);

  return (
    <div className="not-found">
      <h1>Oooops...</h1>
      <p>That page cannot be found.</p>
      <p>
        Go back to the <Link href="/">homepage</Link>
      </p>
    </div>
  );
}
