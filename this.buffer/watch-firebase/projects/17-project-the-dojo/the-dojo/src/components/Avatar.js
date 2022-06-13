import styles from "components/Avatar.module.css";

const Avatar = ({ src }) => {
  return (
    <div className={styles.avatar}>
      <img src={src} alt="User avatar" />
    </div>
  );
};

export default Avatar;
