import { Timestamp } from "firebase/firestore";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import useAuthContext from "hooks/useAuthContext";
import styles from "components/ProjectComments.module.css";

const ProjectComments = () => {
  const [newComment, setNewComment] = useState("");
  const { user } = useAuthContext();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newCommentObj = {
      id: uuidv4(),
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment,
      createdAt: Timestamp.fromDate(new Date())
    };

    console.log(newCommentObj);
  };

  return (
    <div className={styles["project-comments"]}>
      <h4>Project Comments</h4>

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
