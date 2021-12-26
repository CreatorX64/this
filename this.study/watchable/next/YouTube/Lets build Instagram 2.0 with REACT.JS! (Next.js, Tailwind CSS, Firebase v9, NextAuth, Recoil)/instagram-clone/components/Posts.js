import { useEffect, useState } from "react";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import { firebaseFirestore } from "../firebase/config";
import { Post } from "./Post";

export function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(
      query(
        collection(firebaseFirestore, "posts"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        if (snapshot) {
          const postsData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }));
          setPosts(postsData);
        }
      }
    );

    return () => {
      unsub();
    };
  }, []);

  return (
    <div>
      {posts &&
        posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            username={post.username}
            userImg={post.profileImg}
            img={post.image}
            caption={post.caption}
          />
        ))}
    </div>
  );
}
