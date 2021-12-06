import { useRouter } from "next/router";

export default function ClientProjectsPage() {
  const router = useRouter();
  console.log(router.query);

  function loadProjectHandler() {
    // router.replace("/clients/max/projectA"); // Can't go back
    // router.push("/clients/max/projectA");
    router.push({
      pathname: "/clients/[id]/[projectId]",
      query: { id: "max", projectId: "projectA" }
    });
  }

  return (
    <div>
      <h1>Projects of a Given Client</h1>
      <button onClick={loadProjectHandler}>Load Project A</button>
    </div>
  );
}
