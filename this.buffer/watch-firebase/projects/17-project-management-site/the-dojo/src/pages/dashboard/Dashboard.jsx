import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";
import { ProjectList } from "../../components/ProjectList";
import { ProjectFilter } from "./ProjectFilter";

export function Dashboard() {
  const [currentFilter, setCurrentFilter] = useState("all");
  const { user } = useAuthContext();
  const { documents, error } = useCollection("projects");

  function handleChangeFilter(newFilter) {
    setCurrentFilter(newFilter);
  }

  const projects = documents?.filter((doc) => {
    switch (currentFilter) {
      case "all":
        return true;
      case "mine":
        return doc.assignedUsersList.some(
          (assignedUser) => assignedUser.id === user.uid
        );
      case "development":
      case "design":
      case "sales":
      case "marketing":
        return doc.category === currentFilter;
      default:
        throw new Error("Unkown filter in Dashboard");
    }
  });

  return (
    <div>
      <h2 className="page-title">Dashboard</h2>

      {error && <p className="error">{error}</p>}

      {projects && (
        <>
          <ProjectFilter
            currentFilter={currentFilter}
            onChangeFilter={handleChangeFilter}
          />
          <ProjectList projects={projects} />
        </>
      )}
    </div>
  );
}
