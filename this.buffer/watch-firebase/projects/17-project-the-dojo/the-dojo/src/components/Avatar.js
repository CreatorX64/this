import styles from "styles/Avatar.module.css";

const Avatar = ({ src, className = "" }) => {
  return (
    <div className={`${styles.avatar} ${className}`}>
      <img src={src} alt="User avatar" />
    </div>
  );
};

export default Avatar;
