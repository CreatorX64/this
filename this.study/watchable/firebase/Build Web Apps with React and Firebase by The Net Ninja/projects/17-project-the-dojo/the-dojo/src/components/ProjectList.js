import { Link } from "react-router-dom";

import Avatar from "components/Avatar";
import styles from "styles/ProjectList.module.css";

const ProjectList = ({ projects }) => {
  return (
    <div className={styles["project-list"]}>
      {projects.length === 0 ? (
        <p>No projects yet</p>
      ) : (
        projects.map((project) => (
          <Link key={project.id} to={`/projects/${project.id}`}>
            <h4>{project.name}</h4>
            <p>Due by {project.dueDate.toDate().toDateString()}</p>
            <div className={styles["assigned-to"]}>
              <ul>
                {project.assignedUsersList.map((user) => (
                  <li key={user.id}>
                    <Avatar src={user.photoURL} className={styles.avatar} />
                  </li>
                ))}
              </ul>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default ProjectList;
