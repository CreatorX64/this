import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router";
import { AddPostModal } from "../../components/AddPostModal/AddPostModal";
import { Post } from "../../components/Post/Post";

const GET_PROFILE = gql`
  query GetProfile($userId: ID!) {
    profile(userId: $userId) {
      bio
      user {
        id
        name
        posts {
          id
          title
          content
          createdAt
        }
      }
    }
  }
`;

export const Profile = () => {
  const { id } = useParams();
  const { data, error, loading } = useQuery(GET_PROFILE, {
    variables: {
      userId: id
    }
  });

  if (error) {
    return <p>There was an error!</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  const { profile } = data;

  return (
    <div>
      <div
        style={{
          marginBottom: "2rem",
          display: "flex ",
          justifyContent: "space-between"
        }}
      >
        <div>
          <h1>{profile.user.name}</h1>
          <p>{profile.bio}</p>
        </div>
        <div>{"profile" ? <AddPostModal /> : null}</div>
      </div>

      <div>
        {profile.user.posts.map((post) => (
          <Post
            key={post.id}
            title={post.title}
            content={post.content}
            date={post.createdAt}
            id={post.id}
            username={profile.user.name}
          />
        ))}
      </div>
    </div>
  );
};
