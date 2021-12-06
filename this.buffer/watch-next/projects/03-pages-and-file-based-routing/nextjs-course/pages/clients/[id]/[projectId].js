import { useRouter } from "next/router";

export default function ClientProjectPage() {
  const router = useRouter();
  console.log(router.query);

  return (
    <div>
      <h1>Project Page</h1>
    </div>
  );
}
