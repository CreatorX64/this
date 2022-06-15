import { useParams } from "react-router-dom";

import useDocument from "hooks/useDocument";
import ProjectSummary from "components/ProjectSummary";
import ProjectComments from "components/ProjectComments";
import styles from "pages/Project.module.css";

const Project = () => {
  const { id } = useParams();
  const { errorMessage, document: project } = useDocument("projects", id);

  if (errorMessage) {
    return <div className="error">{errorMessage}</div>;
  } else if (!project) {
    return <div className="loading">Loading...</div>;
  } else {
    return (
      <div className={styles["project-details"]}>
        <ProjectSummary project={project} />
        <ProjectComments />
      </div>
    );
  }
};

export default Project;
