import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import { Avatar } from "../../components/Avatar";
import styles from "./Project.module.css";
import { useNavigate } from "react-router-dom";

export function ProjectSummary({ project }) {
  const { deleteDocument } = useFirestore("projects");
  const { user } = useAuthContext();
  const navigate = useNavigate();

  function handleClick() {
    deleteDocument(project.id);
    navigate("/");
  }

  return (
    <div>
      <div className={styles.summary}>
        <h2 className="page-title">{project.name}</h2>
        <p>By {project.createdBy.displayName}</p>
        <p className={styles.due}>
          Project due by {project.dueDate.toDate().toLocaleDateString()}
        </p>
        <p className={styles.details}>{project.details}</p>
        <h4>Project is assigned to:</h4>
        <div className={styles.assignedUsers}>
          {project.assignedUsersList.map((user) => (
            <div key={user.id}>
              <Avatar src={user.photoURL} className={styles.avatar} />
            </div>
          ))}
        </div>
      </div>

      {user.uid === project.createdBy.id && (
        <button className="btn" onClick={handleClick}>
          Mark as complete
        </button>
      )}
    </div>
  );
}
