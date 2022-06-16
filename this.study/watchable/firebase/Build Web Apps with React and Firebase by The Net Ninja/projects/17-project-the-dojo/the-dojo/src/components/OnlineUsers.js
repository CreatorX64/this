import useCollection from "hooks/useCollection";
import Avatar from "components/Avatar";
import styles from "styles/OnlineUsers.module.css";

const OnlineUsers = () => {
  const { documents, errorMessage } = useCollection("users");

  return (
    <div className={styles["user-list"]}>
      <h2>All Users</h2>

      {errorMessage && <p className="error">{errorMessage}</p>}

      {documents &&
        documents.map((user) => (
          <div key={user.id} className={styles["user-list-item"]}>
            {user.online && <span className={styles["online-user"]}></span>}
            <span>{user.displayName}</span>
            <Avatar src={user.photoURL} className={styles.avatar} />
          </div>
        ))}
    </div>
  );
};

export default OnlineUsers;
