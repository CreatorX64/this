import Avatar from "components/Avatar";
import styles from "components/ProjectSummary.module.css";

const ProjectSummary = ({ project }) => {
  return (
    <div className={styles["project-summary"]}>
      <h2 className="page-title">{project.name}</h2>

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
  );
};

export default ProjectSummary;
