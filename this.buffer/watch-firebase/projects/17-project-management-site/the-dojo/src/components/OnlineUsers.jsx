import { useCollection } from "../hooks/useCollection";
import { Avatar } from "./Avatar";
import styles from "./OnlineUsers.module.css";

export function OnlineUsers() {
  const { error, documents } = useCollection("users");

  return (
    <div className={styles.list}>
      <h2>All Users</h2>

      {error && <div className="error">{error}</div>}

      {documents &&
        documents.map((user) => (
          <div key={user.id} className={styles.item}>
            {user.online && <span className={styles.online}></span>}
            <Avatar src={user.photoURL} className={styles.avatar} />
            <span>{user.displayName}</span>
          </div>
        ))}
    </div>
  );
}
