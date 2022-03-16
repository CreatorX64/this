import "./Post.css";

export const Post = ({ title, content, date, username, published, id }) => {
  const formatedDate = new Date(Number(date));

  return (
    <div className="Post">
      <div className="Post__header-container">
        <h2>{title}</h2>
        <h4>
          Created at {formatedDate.toDateString()} by {username}
        </h4>
      </div>
      <p>{content}</p>
    </div>
  );
};
