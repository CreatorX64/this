import ProjectList from "components/ProjectList";
import useCollection from "hooks/useCollection";

const Dashboard = () => {
  const { documents: projects, errorMessage } = useCollection("projects");

  return (
    <div>
      <h2 className="page-title">Dashboard</h2>

      {errorMessage && <p className="error">{errorMessage}</p>}

      {projects && <ProjectList projects={projects} />}
    </div>
  );
};

export default Dashboard;
