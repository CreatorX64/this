import { useState, Fragment } from "react";
import { getFeedbacks, getFeedbacksFilePath } from "../api/feedbacks/index";

export default function FeedbackPage(props) {
  const [feedback, setFeedback] = useState();

  function handleLoadFeedback(id) {
    fetch(`/api/feedbacks/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFeedback(data.feedback);
      });
  }

  return (
    <Fragment>
      {feedback && (
        <p>
          <b>Selected feedback:</b> {feedback.email}
        </p>
      )}
      <ul>
        {props.feedbacks.map((feedback) => (
          <li key={feedback.id}>
            {feedback.message}
            <button onClick={() => handleLoadFeedback(feedback.id)}>
              Show Details
            </button>
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

export async function getStaticProps() {
  const filePath = getFeedbacksFilePath();
  const feedbacks = getFeedbacks(filePath);
  return {
    props: {
      feedbacks
    }
  };
}
