import styles from "./Avatar.module.css";

export function Avatar({ src, className }) {
  return (
    <div className={`${styles.avatar} ${className ?? ""}`}>
      <img src={src} alt="User avatar" />
    </div>
  );
}
