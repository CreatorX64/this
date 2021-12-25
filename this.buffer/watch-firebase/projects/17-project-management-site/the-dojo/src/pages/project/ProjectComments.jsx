import { useState } from "react";
import { Timestamp } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { formatDistanceToNow } from "date-fns";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import styles from "./Project.module.css";
import { Avatar } from "../../components/Avatar";

export function ProjectComments({ project }) {
  const [newComment, setNewComment] = useState("");
  const { user } = useAuthContext();
  const { response, updateDocument } = useFirestore("projects");

  async function handleSubmit(event) {
    event.preventDefault();

    const commentToAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment,
      createdAt: Timestamp.fromDate(new Date()),
      id: uuid()
    };

    await updateDocument(project.id, {
      comments: [...project.comments, commentToAdd]
    });

    if (!response.error) {
      setNewComment("");
    }
  }

  return (
    <div className={styles.comments}>
      <h4>Project Comments</h4>

      <ul>
        {project.comments.map((comment) => (
          <li key={comment.id}>
            <div className={styles.commentAuthor}>
              <Avatar src={comment.photoURL} className={styles.avatar} />
              <p>{comment.displayName}</p>
            </div>
            <div className={styles.commentDate}>
              <p>
                {formatDistanceToNow(comment.createdAt.toDate(), {
                  addSuffix: true
                })}
              </p>
            </div>
            <div className={styles.commentContent}>
              <p>{comment.content}</p>
            </div>
          </li>
        ))}
      </ul>

      <form className={styles.commentForm} onSubmit={handleSubmit}>
        <label>
          <span>Add new comment</span>
          <textarea
            onChange={(event) => setNewComment(event.target.value)}
            value={newComment}
            required
          />
        </label>
        <button className="btn">Add comment</button>
      </form>
    </div>
  );
}
