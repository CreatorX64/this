import { useState, useEffect, useContext } from "react";
import NotificationContext from "../../store/NotificationContext";
import CommentList from "./CommentList";
import NewComment from "./NewComment";
import classes from "./Comments.module.css";

export default function Comments(props) {
  const { eventId } = props;
  const ctx = useContext(NotificationContext);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isFetchingComments, setIsFetchingComments] = useState(false);

  useEffect(() => {
    setIsFetchingComments(true);
    fetch(`/api/comments/${eventId}`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data.comments);
        setIsFetchingComments(false);
      });
  }, [eventId]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    ctx.showNotification({
      title: "Sending comment...",
      message: "Your comment is currently being stored into a database",
      status: "pending"
    });

    fetch(`/api/comments/${eventId}`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        // Error returned by the server
        return res.json().then((data) => {
          throw new Error(data.message || "Something went wrong!");
        });
      })
      .then((data) => {
        ctx.showNotification({
          title: "Success!",
          message: "Your comment was saved",
          status: "success"
        });

        setComments((prevState) => [data.comment, ...prevState]);
      })
      .catch((error) => {
        ctx.showNotification({
          title: "Error!",
          message: error.message || "Something went wrong!",
          status: "error"
        });
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComments && (
        <CommentList comments={comments} />
      )}
      {showComments && isFetchingComments && <p>Loading...</p>}
    </section>
  );
}
