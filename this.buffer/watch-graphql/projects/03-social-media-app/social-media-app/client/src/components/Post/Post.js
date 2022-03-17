import { gql, useMutation } from "@apollo/client";
import "./Post.css";

const PUBLISH_POST = gql`
  mutation PublishPost($postId: ID!) {
    postPublish(postId: $postId) {
      userErrors {
        message
      }
      post {
        title
      }
    }
  }
`;

const UNPUBLISH_POST = gql`
  mutation UnpublishPost($postId: ID!) {
    postUnpublish(postId: $postId) {
      userErrors {
        message
      }
      post {
        title
      }
    }
  }
`;

export const Post = ({
  title,
  content,
  date,
  username,
  published,
  id,
  isMyProfile
}) => {
  const [publishPost] = useMutation(PUBLISH_POST);
  const [unpublishPost] = useMutation(UNPUBLISH_POST);
  const formatedDate = new Date(Number(date));

  return (
    <div
      className="Post"
      style={published === false ? { backgroundColor: "hotpink" } : {}}
    >
      {isMyProfile && published === false && (
        <p
          className="Post__publish"
          onClick={() => {
            publishPost({
              variables: {
                postId: id
              }
            });
          }}
        >
          publish
        </p>
      )}

      {isMyProfile && published === true && (
        <p
          className="Post__publish"
          onClick={() => {
            unpublishPost({
              variables: {
                postId: id
              }
            });
          }}
        >
          unpublish
        </p>
      )}

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
