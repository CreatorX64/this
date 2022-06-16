import { useNavigate } from "react-router-dom";

import useAuthContext from "hooks/useAuthContext";
import useFirestore from "hooks/useFirestore";
import Avatar from "components/Avatar";
import styles from "styles/ProjectSummary.module.css";

const ProjectSummary = ({ project }) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { deleteDocument } = useFirestore("projects");

  const handleClick = (event) => {
    deleteDocument(project.id);
    navigate("/");
  };

  return (
    <div>
      <div className={styles["project-summary"]}>
        <h2 className="page-title">{project.name}</h2>

        <p>By {project.createdBy.displayName}</p>

        <p className={styles["due-date"]}>
          Project due by {project.dueDate.toDate().toDateString()}
        </p>

        <p className={styles.details}>{project.details}</p>

        <h4>Project is assigned to:</h4>

        <div className={styles["assigned-users"]}>
          {project.assignedUsersList.map((user) => (
            <div key={user.id}>
              <Avatar src={user.photoURL} className={styles.avatar} />
            </div>
          ))}
        </div>
      </div>

      {user.uid === project.createdBy.id && (
        <button className={`btn ${styles.btn}`} onClick={handleClick}>
          Mark as Complete
        </button>
      )}
    </div>
  );
};

export default ProjectSummary;
