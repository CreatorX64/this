import { useEffect, useState } from "react";

import useAuthContext from "hooks/useAuthContext";
import useCollection from "hooks/useCollection";
import ProjectFilter from "components/ProjectFilter";
import ProjectList from "components/ProjectList";

const Dashboard = () => {
  const [currentFilter, setCurrentFilter] = useState("all");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const { documents: projects, errorMessage } = useCollection("projects");
  const { user } = useAuthContext();

  const handleFilterChange = (newFilter) => {
    setCurrentFilter(newFilter);
  };

  useEffect(() => {
    if (!projects || errorMessage) {
      return;
    }

    setFilteredProjects(
      projects.filter((project) => {
        switch (currentFilter) {
          case "all":
            return true;
          case "mine":
            return project.assignedUsersList
              .map((u) => u.id)
              .includes(user.uid);
          case "development":
          case "design":
          case "sales":
          case "marketing":
            return project.category === currentFilter;
          default:
            throw new Error("Unkown filter in setFilteredProjects()");
        }
      })
    );
  }, [currentFilter, projects, user.uid, errorMessage]);

  return (
    <div>
      <h2 className="page-title">Dashboard</h2>

      {errorMessage && <p className="error">{errorMessage}</p>}

      {projects && (
        <>
          <ProjectFilter
            currentFilter={currentFilter}
            onFilterChange={handleFilterChange}
          />
          <ProjectList projects={filteredProjects} />
        </>
      )}
    </div>
  );
};

export default Dashboard;
