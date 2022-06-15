import { Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import useAuthContext from "hooks/useAuthContext";
import useFirestore from "hooks/useFirestore";
import Avatar from "components/Avatar";
import styles from "components/ProjectComments.module.css";

const ProjectComments = ({ project }) => {
  const [newComment, setNewComment] = useState("");
  const { user } = useAuthContext();
  const { updateDocument, response } = useFirestore("projects");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newCommentObj = {
      id: uuidv4(),
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment,
      createdAt: Timestamp.fromDate(new Date())
    };

    await updateDocument(project.id, {
      comments: [...project.comments, newCommentObj]
    });
  };

  // Reset the new comment state once a comment has been sent & no errors. In
  // a real app, we wouldn't wait for the response & we would optimistically
  // update the UI. However, I kept it this way to make debugging easier
  useEffect(() => {
    if (!response.errorMessage && !response.isPending && response.isSuccess) {
      setNewComment("");
    }
  }, [response]);

  return (
    <div className={styles["project-comments"]}>
      <h4>Project Comments</h4>

      <ul>
        {project.comments.length > 0 &&
          project.comments.map((comment) => (
            <li key={comment.id}>
              <div className={styles["comment-author"]}>
                <Avatar src={comment.photoURL} className={styles.avatar} />
                <p>{comment.displayName}</p>
              </div>
              <div className={styles["comment-date"]}>
                <p>date here</p>
              </div>
              <div className={styles["comment-content"]}>
                <p>{comment.content}</p>
              </div>
            </li>
          ))}
      </ul>

      <form className={styles["add-comment"]} onSubmit={handleSubmit}>
        <label>
          <span>Add new comment:</span>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            required
          />
        </label>
        <button className="btn">Add Comment</button>
      </form>
    </div>
  );
};

export default ProjectComments;
