import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc
} from "firebase/firestore";
import Moment from "react-moment";
import { firebaseFirestore } from "../firebase/config";

export function Post({ id, username, userImg, img, caption }) {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(
      query(
        collection(firebaseFirestore, "posts", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        if (snapshot) {
          const commentsData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }));
          setComments(commentsData);
        }
      }
    );

    return () => {
      unsub();
    };
  }, [id]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(firebaseFirestore, "posts", id, "likes"),
      (snapshot) => {
        setLikes(snapshot.docs);
      }
    );

    return () => {
      unsub();
    };
  }, [id]);

  useEffect(() => {
    setHasLiked(
      likes.findIndex((like) => like.id === session?.user?.uid) !== -1
    );
  }, [likes]);

  async function likePost() {
    if (hasLiked) {
      await deleteDoc(
        doc(firebaseFirestore, "posts", id, "likes", session.user.uid)
      );
    } else {
      await setDoc(
        doc(firebaseFirestore, "posts", id, "likes", session.user.uid),
        {
          username: session.user.username
        }
      );
    }
  }

  async function sendComment(event) {
    event.preventDefault();

    const commentToSend = comment;
    setComment("");

    await addDoc(collection(firebaseFirestore, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp()
    });
  }

  return (
    <div className="my-7 border roudned-sm bg-white">
      {/* Header */}
      <div className="flex items-center p-5">
        <img
          src={userImg}
          alt="User avatar"
          className="w-12 h-12 rounded-full border p-1 mr-3"
        />
        <p className="flex-1 font-bold">{username}</p>
        <DotsHorizontalIcon className="h-5" />
      </div>

      {/* Image */}
      <img src={img} className="object-cover w-full" alt="Post" />

      {/* Buttons */}
      {session && (
        <div className="flex justify-between p-4">
          <div className="flex space-x-4">
            {hasLiked ? (
              <HeartIconFilled
                className="btn text-red-500"
                onClick={likePost}
              />
            ) : (
              <HeartIcon className="btn" onClick={likePost} />
            )}
            <ChatIcon className="btn" />
            <PaperAirplaneIcon className="btn" />
          </div>
          <BookmarkIcon className="btn ml-auto" />
        </div>
      )}

      {/* Caption */}
      <p className="p-5 truncate">
        {likes.length > 0 && (
          <span className="block font-bold mb-1">{likes.length} likes</span>
        )}
        <span className="mr-1 font-bold">{username} </span>
        {caption}
      </p>

      {/* Comments */}
      {comments.length > 0 && (
        <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-center space-x-2 mb-3">
              <img
                src={comment.userImage}
                alt="Comment user avatar"
                className="h-7 rounded-full"
              />
              <p className="text-sm flex-1">
                <span className="font-bold">{comment.username}</span>{" "}
                {comment.comment}
              </p>

              <Moment fromNow className="pr-5 text-xs">
                {comment.timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {/* Input box */}
      {session && (
        <form className="flex items-center p-4">
          <EmojiHappyIcon className="w-7 h-7" />
          <input
            type="text"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="Add a comment..."
            className="flex-1 border-none focus:ring-0"
          />
          <button
            type="submit"
            disabled={!comment.trim()}
            className="font-semibold text-blue-400"
            onClick={sendComment}
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}
