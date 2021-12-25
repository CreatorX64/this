import { Link } from "react-router-dom";
import { Avatar } from "../components/Avatar";
import styles from "./ProjectList.module.css";

export function ProjectList({ projects }) {
  return (
    <div className={styles.list}>
      {projects.length === 0 && <p>No projects yet</p>}

      {projects.map((project) => (
        <Link
          key={project.id}
          to={`/projects/${project.id}`}
          className={styles.item}
        >
          <h4>{project.name}</h4>
          <p>Due by {project.dueDate.toDate().toLocaleDateString()}</p>
          <div className={styles.assignedTo}>
            <ul>
              {project.assignedUsersList.map((user) => (
                <li key={user.photoURL}>
                  <Avatar src={user.photoURL} />
                </li>
              ))}
            </ul>
          </div>
        </Link>
      ))}
    </div>
  );
}
