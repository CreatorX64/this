import { useParams } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument";
import styles from "./Project.module.css";
import { ProjectComments } from "./ProjectComments";
import { ProjectSummary } from "./ProjectSummary";

export function Project() {
  const { id } = useParams();
  const { error, document } = useDocument("projects", id);

  if (error) {
    return <div className="error">{error}</div>;
  } else if (!document) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className={styles.details}>
      <ProjectSummary project={document} />
      <ProjectComments project={document} />
    </div>
  );
}
