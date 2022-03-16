import { gql, useQuery } from "@apollo/client";
import { Post } from "../../components/Post/Post";

const GET_POST = gql`
  query {
    posts {
      id
      title
      content
      createdAt
      user {
        name
      }
    }
  }
`;

export const Posts = () => {
  const { data, error, loading } = useQuery(GET_POST);

  if (error) {
    return <p>There was an error!</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  const { posts } = data;

  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          title={post.title}
          content={post.content}
          date={post.createdAt}
          id={post.id}
          username={post.user.name}
        />
      ))}
    </div>
  );
};
